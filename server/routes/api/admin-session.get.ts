import { defineHandler } from "nitro/h3";
import { isAdmin, json } from "../../utils/store";

export default defineHandler((event) => json({ admin: isAdmin(event.req) }));
