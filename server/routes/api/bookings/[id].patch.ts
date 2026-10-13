import { defineHandler } from "nitro/h3";
import { isAdmin, json, updateStatus, type BookingStatus } from "../../../utils/store";

const STATUSES: BookingStatus[] = ["new", "confirmed", "completed", "cancelled"];

export default defineHandler(async (event) => {
  if (!isAdmin(event.req)) return json({ error: "Unauthorized" }, { status: 401 });
  const { status } = (await event.req.json().catch(() => ({}))) as { status?: BookingStatus };
  if (!status || !STATUSES.includes(status)) return json({ error: "Invalid status" }, { status: 400 });
  const b = await updateStatus(String(event.context.params?.id), status);
  return b ? json(b) : json({ error: "Not found" }, { status: 404 });
});
