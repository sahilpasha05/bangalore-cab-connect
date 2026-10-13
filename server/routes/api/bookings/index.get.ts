import { defineHandler } from "nitro/h3";
import { isAdmin, json, listBookings } from "../../../utils/store";

export default defineHandler(async (event) => {
  if (!isAdmin(event.req)) return json({ error: "Unauthorized" }, { status: 401 });
  return json(await listBookings());
});
