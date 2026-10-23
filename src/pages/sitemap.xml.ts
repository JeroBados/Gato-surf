import { houses } from "../data/houses";
import { routes } from "../i18n/ui";
import { site } from "../config/site";

export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const pages = [
    { pair: routes.home, priority: "1.0", changefreq: "weekly" },
    { pair: routes.compound, priority: "0.8", changefreq: "monthly" },
    { pair: routes.saladita, priority: "0.8", changefreq: "monthly" },
    { pair: routes.privacy, priority: "0.3", changefreq: "yearly" },
    ...houses.map((h) => ({
      pair: { en: routes.house.en(h.slug), es: routes.house.es(h.slug) },
      priority: "0.9",
      changefreq: "weekly",
    })),
  ];
  const urls = pages.flatMap(({ pair, priority, changefreq }) =>
    (["en", "es"] as const).map((l) => {
      const loc = new URL(pair[l], site.url).toString();
      const alts = (["en", "es"] as const)
        .map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${new URL(pair[x], site.url)}"/>`)
        .join("");
      return `<url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${alts}<xhtml:link rel="alternate" hreflang="x-default" href="${new URL(pair.en, site.url)}"/></url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
