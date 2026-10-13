import { defineHandler } from "nitro/h3";
import { COOKIE, json } from "../../utils/store";

export default defineHandler(() =>
  json({ ok: true }, { headers: { "set-cookie": `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0` } }),
);
