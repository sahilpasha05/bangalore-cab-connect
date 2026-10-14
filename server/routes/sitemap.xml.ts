import { defineHandler } from "nitro/h3";
import { routes } from "../../src/data/routes";
import { vehicles } from "../../src/data/vehicles";

const SITE = "https://www.bangalorecabrental.com";

export default defineHandler(() => {
  const today = new Date().toISOString().slice(0, 10);
  const urls: { path: string; priority: string }[] = [
    { path: "/", priority: "1.0" },
    { path: "/fleet", priority: "0.9" },
    { path: "/services", priority: "0.8" },
    { path: "/routes", priority: "0.9" },
    { path: "/contact", priority: "0.6" },
    ...routes.map((r) => ({ path: `/routes/${r.slug}`, priority: "0.8" })),
    ...vehicles.map((v) => ({ path: `/vehicles/${v.slug}`, priority: "0.8" })),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE}${u.path}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
});
