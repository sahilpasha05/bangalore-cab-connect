import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: string;
  notes: string;
  status: BookingStatus;
};

const FILE = path.join(process.cwd(), "data", "bookings.json");
let queue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Booking[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeAll(list: Booking[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

// serialise writes so concurrent requests don't clobber each other
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

// ---- storage: Supabase when configured, local JSON file otherwise ----
const SB_URL = () => process.env.SUPABASE_URL;
const SB_KEY = () => process.env.SUPABASE_ANON_KEY;
const DB_TOKEN = () => process.env.ADMIN_DB_TOKEN;
const useSupabase = () => !!(SB_URL() && SB_KEY() && DB_TOKEN());

async function sb(pathAndQuery: string, init: { method?: string; json?: unknown } = {}) {
  const res = await fetch(`${SB_URL()}/rest/v1/${pathAndQuery}`, {
    method: init.method || "GET",
    headers: {
      apikey: SB_KEY()!,
      authorization: `Bearer ${SB_KEY()}`,
      "content-type": "application/json",
    },
    body: init.json === undefined ? undefined : JSON.stringify(init.json),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

type Row = Omit<Booking, "createdAt"> & { created_at: string };
const fromRow = ({ created_at, ...r }: Row): Booking => ({ ...r, createdAt: created_at });

export const listBookings = async (): Promise<Booking[]> => {
  if (useSupabase()) {
    const rows: Row[] = await sb("rpc/admin_list_bookings", { method: "POST", json: { tok: DB_TOKEN() } });
    return rows.map(fromRow);
  }
  return (await readAll()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

export const addBooking = async (b: Omit<Booking, "id" | "createdAt" | "status">) => {
  if (useSupabase()) {
    const id = crypto.randomUUID();
    await sb("bookings", { method: "POST", json: { id, ...b } });
    return { ...b, id, createdAt: new Date().toISOString(), status: "new" as const };
  }
  return locked(async () => {
    const list = await readAll();
    const booking: Booking = {
      ...b,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    list.push(booking);
    await writeAll(list);
    return booking;
  });
};

export const updateStatus = async (id: string, status: BookingStatus) => {
  if (useSupabase()) {
    const ok = await sb("rpc/admin_set_booking_status", {
      method: "POST",
      json: { tok: DB_TOKEN(), booking_id: id, new_status: status },
    });
    return ok ? { id, status } : null;
  }
  return locked(async () => {
    const list = await readAll();
    const b = list.find((x) => x.id === id);
    if (!b) return null;
    b.status = status;
    await writeAll(list);
    return b;
  });
};

export const deleteBooking = async (id: string) => {
  if (useSupabase()) {
    return !!(await sb("rpc/admin_delete_booking", {
      method: "POST",
      json: { tok: DB_TOKEN(), booking_id: id },
    }));
  }
  return locked(async () => {
    const list = await readAll();
    const next = list.filter((x) => x.id !== id);
    await writeAll(next);
    return next.length !== list.length;
  });
};

// ---- admin auth ----
const ADMIN_USERNAME = () => process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = () => process.env.ADMIN_PASSWORD || "admin123";
const SECRET = () => process.env.ADMIN_SECRET || "local-dev-secret-" + ADMIN_PASSWORD();
export const COOKIE = "admin_session";

const safeEqual = (x: string, y: string) => {
  const a = Buffer.from(x);
  const b = Buffer.from(y);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

export function checkCredentials(username: string, password: string) {
  const u = safeEqual(username, ADMIN_USERNAME());
  const p = safeEqual(password, ADMIN_PASSWORD());
  return u && p;
}

export function sessionToken() {
  return crypto.createHmac("sha256", SECRET()).update("admin:" + ADMIN_USERNAME()).digest("hex");
}

export function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return false;
  const a = Buffer.from(m[1]);
  const b = Buffer.from(sessionToken());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  });
