import { defineHandler } from "nitro/h3";
import { COOKIE, checkCredentials, json, sessionToken } from "../../utils/store";

export default defineHandler(async (event) => {
  const { username, password } = (await event.req.json().catch(() => ({}))) as { username?: string; password?: string };
  if (!username || !password || !checkCredentials(username, password))
    return json({ error: "Wrong username or password" }, { status: 401 });
  return json(
    { ok: true },
    { headers: { "set-cookie": `${COOKIE}=${sessionToken()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800` } },
  );
});
