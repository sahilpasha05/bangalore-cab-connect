import { defineHandler } from "nitro/h3";
import { deleteBooking, isAdmin, json } from "../../../utils/store";

export default defineHandler(async (event) => {
  if (!isAdmin(event.req)) return json({ error: "Unauthorized" }, { status: 401 });
  const ok = await deleteBooking(String(event.context.params?.id));
  return ok ? json({ ok: true }) : json({ error: "Not found" }, { status: 404 });
});
