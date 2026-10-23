// Conexión con Lodgify (channel manager y motor de reservas).
//
// La web no procesa pagos ni guarda datos de tarjetas. Usa los widgets oficiales de Lodgify:
//  - Search Bar (home y grupos): busca disponibilidad en las 4 casas y abre los resultados en Lodgify.
//  - Book Now Box (página de cada casa): muestra precio por fechas y abre el checkout de esa casa.
// Si un widget no tiene ID cargado, o el visitante no tiene JavaScript, se usa nuestro buscador
// propio, que arma la URL de Lodgify con fechas y huéspedes (modo 'redirect').
//
// IMPORTANTE el día del lanzamiento: gatosurfhouses.com pasa a apuntar a esta web, así que el sitio
// de Lodgify tiene que vivir en un subdominio (Lodgify › Website › Domain), por ejemplo
// reservas.gatosurfhouses.com. Ese subdominio va en `bookingBase`. Si no se cambia, el buscador
// manda a una página que ya no existe.

export type LodgifyMode = 'widget' | 'redirect';

export const lodgify = {
  mode: 'widget' as LodgifyMode,

  websiteId: '559439',
  websiteSlug: 'gatosurfhouses',

  // Hoy el motor vive en el dominio principal; cambiar al subdominio el día del lanzamiento.
  bookingBase: 'https://gatosurfhouses.com',

  // Página de resultados de búsqueda del sitio de Lodgify, por idioma.
  searchPath: { en: '/en/all-properties', es: '/es/propiedades' },

  // Rental ID de cada casa (Lodgify › Website › Widgets › Book Now Box). Confirmados por Jero.
  // Con null, esa casa usa el buscador propio en lugar del Book Now Box.
  rentalIds: {
    'rincon-del-surf': '641993',
    'paraiso-del-surf': '641992',
    'villa-de-mar': '641990',
    'casa-gato-surf': '641991',
  } as Record<string, string | null>,

  // Página de cada casa en el sitio de Lodgify (para el modo 'redirect').
  properties: {
    'rincon-del-surf': { en: '/en/surf-rincon-50m-surf-ac-starlink-alberca', es: '/es/rincon-del-surf-3-personas' },
    'paraiso-del-surf': { en: '/en/paraiso-del-surf-3-personas', es: '/es/paraiso-del-surf-3-personas' },
    'villa-de-mar': { en: '/en/villa-de-mar-6-personas', es: '/es/villa-de-mar-6-personas' },
    'casa-gato-surf': { en: '/en/gato-surf-house-46-pers-2-rec-ac-starlink-pool', es: '/es/casa-gato-surf-6-personas' },
  } as Record<string, { en: string; es: string }>,

  // Parámetros de la búsqueda de Lodgify (modo 'redirect').
  params: { arrival: 'arrival', departure: 'departure', adults: 'adults', children: 'children', infants: 'infants', pets: 'pets' },

  currency: 'USD',

  // Scripts oficiales (versión "stable" de Lodgify).
  scripts: {
    searchBar: 'https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js',
    bookNow: 'https://app.lodgify.com/book-now-box/stable/renderBookNowBox.js',
  },
} as const;

export const searchPageUrl = (lang: 'en' | 'es') =>
  new URL(lodgify.searchPath[lang], lodgify.bookingBase).toString();

export function bookingUrl(opts: { lang: 'en' | 'es'; house?: string; arrival?: string; departure?: string; adults?: number }) {
  const path = opts.house && lodgify.properties[opts.house] ? lodgify.properties[opts.house][opts.lang] : lodgify.searchPath[opts.lang];
  const url = new URL(path, lodgify.bookingBase);
  const p = lodgify.params;
  if (opts.arrival) url.searchParams.set(p.arrival, opts.arrival);
  if (opts.departure) url.searchParams.set(p.departure, opts.departure);
  url.searchParams.set(p.adults, String(opts.adults ?? 2));
  url.searchParams.set('currency', lodgify.currency);
  return url.toString();
}
