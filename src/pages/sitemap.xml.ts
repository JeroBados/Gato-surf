import { houses } from "../data/houses";
import { routes } from "../i18n/ui";
import { site } from "../config/site";
export function GET() {
  const pairs = [routes.home, routes.compound, routes.saladita, routes.privacy, ...houses.map((h) => ({ en: routes.house.en(h.slug), es: routes.house.es(h.slug) }))];
  const urls = pairs.flatMap((p) => (["en", "es"] as const).map((l) => {
    const alt = (["en", "es"] as const).map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${new URL(p[x], site.url)}"/>`).join("");
    return `<url><loc>${new URL(p[l], site.url)}</loc>${alt}</url>`;
  }));
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
