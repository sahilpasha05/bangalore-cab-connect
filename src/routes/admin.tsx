import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Phone, Trash2, RefreshCw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Bookings" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Status = "new" | "confirmed" | "completed" | "cancelled";
type Booking = {
  id: string; createdAt: string; name: string; phone: string; pickup: string; drop: string;
  date: string; time: string; vehicle: string; passengers: string; notes: string; status: Status;
};

const STATUSES: Status[] = ["new", "confirmed", "completed", "cancelled"];
const badge: Record<Status, string> = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-200 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin-session").then((r) => r.json()).then((d) => setAuthed(!!d.admin)).catch(() => setAuthed(false));
  }, []);

  if (authed === null) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;
  if (!authed) return <Login onDone={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
}

function Login({ onDone }: { onDone: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin-session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (r.ok) onDone();
    else setError("Wrong username or password");
  }
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm items-center px-4">
      <form onSubmit={submit} className="w-full rounded-2xl border border-border bg-card p-6 shadow-card">
        <h1 className="text-xl font-bold">Admin login</h1>
        <input
          autoFocus placeholder="Username" value={username} autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
        />
        <input
          type="password" autoComplete="current-password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <Button type="submit" className="mt-4 w-full">Sign in</Button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [rows, setRows] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/bookings");
    if (r.status === 401) return onLogout();
    setRows(await r.json());
    setLoading(false);
  }, [onLogout]);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  async function setStatus(id: string, status: Status) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }),
    });
  }
  async function remove(id: string) {
    if (!confirm("Delete this booking?")) return;
    setRows((rs) => rs.filter((r) => r.id !== id));
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
  }
  async function logout() {
    await fetch("/api/admin-session", { method: "DELETE" });
    onLogout();
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    STATUSES.forEach((s) => (c[s] = rows.filter((r) => r.status === s).length));
    return c;
  }, [rows]);

  const shown = rows.filter(
    (r) =>
      (filter === "all" || r.status === filter) &&
      (!q || [r.name, r.phone, r.pickup, r.drop, r.vehicle].join(" ").toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={logout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s} onClick={() => setFilter(s)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize ${
              filter === s ? "border-foreground bg-foreground text-background" : "border-border bg-card"
            }`}
          >
            {s} ({counts[s] ?? 0})
          </button>
        ))}
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, place…"
          className="ml-auto w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none sm:w-64"
        />
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-border bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Customer</th><th className="px-4 py-3">Trip</th>
              <th className="px-4 py-3">When</th><th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Status</th><th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No bookings yet.</td></tr>
            )}
            {shown.map((b) => (
              <tr key={b.id} className="border-b border-border/60 align-top last:border-0">
                <td className="px-4 py-3">
                  <div className="font-semibold">{b.name}</div>
                  <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 text-muted-foreground hover:underline">
                    <Phone className="h-3 w-3" /> {b.phone}
                  </a>
                  <div className="mt-1 text-xs text-muted-foreground">Received {new Date(b.createdAt).toLocaleString()}</div>
                </td>
                <td className="px-4 py-3">
                  <div>{b.pickup || "—"} → {b.drop || "—"}</div>
                  {b.notes && <div className="mt-1 text-xs text-muted-foreground">“{b.notes}”</div>}
                </td>
                <td className="px-4 py-3">{b.date || "—"}{b.time ? ` · ${b.time}` : ""}</td>
                <td className="px-4 py-3">{b.vehicle || "Any"}{b.passengers ? ` · ${b.passengers} pax` : ""}</td>
                <td className="px-4 py-3">
                  <select
                    value={b.status} onChange={(e) => setStatus(b.id, e.target.value as Status)}
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold capitalize ${badge[b.status]}`}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(b.id)} className="text-muted-foreground hover:text-red-600" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
