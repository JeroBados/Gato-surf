import { site } from '../config/site';
import { houses, type House, type Lang } from '../data/houses';
import { routes } from '../i18n/ui';

const url = (path: string) => new URL(path, site.url).toString();

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

const geo = {
  '@type': 'GeoCoordinates',
  latitude: site.geo.lat,
  longitude: site.geo.lng,
};

const amenities = [
  'Shared outdoor pool',
  'Starlink internet',
  'Air conditioning',
  'Full kitchen',
  'Private terrace',
  'Surfboard rack',
  'BBQ area',
  'Free parking',
  'Pets allowed',
];

export const lodgingBusiness = {
  '@type': 'LodgingBusiness',
  '@id': `${site.url}/#business`,
  name: site.name,
  url: site.url,
  image: [url('/images/hero.jpg'), url('/images/og.jpg'), url('/images/pool-day.jpg')],
  telephone: site.whatsapp.number,
  email: site.email,
  address,
  geo,
  hasMap: site.geo.mapsUrl,
  checkinTime: '15:00',
  checkoutTime: '11:00',
  petsAllowed: true,
  priceRange: '$$',
  currenciesAccepted: 'USD, MXN',
  paymentAccepted: 'Credit Card, Debit Card',
  amenityFeature: amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: '5',
  },
  sameAs: [site.instagram.url],
  containedInPlace: {
    '@type': 'TouristDestination',
    name: 'La Saladita',
    address,
    geo,
    touristType: ['Surfer', 'Family', 'Couple'],
  },
  numberOfRooms: houses.length,
  knowsAbout: [
    'La Saladita surf',
    'villas in La Saladita',
    'surf houses Guerrero',
    'group surf retreats Mexico',
  ],
};

export const organization = {
  '@type': 'Organization',
  '@id': `${site.url}/#org`,
  name: site.name,
  url: site.url,
  logo: url('/icon-512.png'),
  email: site.email,
  telephone: site.whatsapp.number,
  sameAs: [site.instagram.url],
  parentOrganization: { '@type': 'Organization', name: site.hostedBy.name, url: site.hostedBy.url },
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: ['en', 'es'],
  publisher: { '@id': `${site.url}/#org` },
};

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbs(lang: Lang, crumbs: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: url(c.path),
    })),
  };
}

export function houseNode(house: House) {
  const images = [house.card, ...house.gallery.map((g) => g.src)].map(url);
  return {
    '@type': 'VacationRental',
    '@id': url(`${routes.house.en(house.slug)}#rental`),
    name: `${house.name} · ${site.name}`,
    identifier: house.slug,
    url: url(routes.house.en(house.slug)),
    image: images,
    address,
    geo,
    checkinTime: '15:00',
    checkoutTime: '11:00',
    petsAllowed: true,
    additionalType: house.size === 'large' ? 'Villa' : 'Surf house',
    containedInPlace: { '@id': `${site.url}/#business` },
    amenityFeature: amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name })),
    containsPlace: {
      '@type': 'Accommodation',
      name: house.name,
      numberOfBedrooms: house.bedrooms,
      numberOfBathroomsTotal: house.baths,
      occupancy: { '@type': 'QuantitativeValue', maxValue: house.guests },
      floorSize: house.levels === 2 ? { '@type': 'QuantitativeValue', value: 2, unitText: 'floors' } : undefined,
    },
  };
}

export function itemList() {
  return {
    '@type': 'ItemList',
    '@id': `${site.url}/#houses`,
    name: 'Gato Surf Houses — four villas and surf houses in La Saladita',
    numberOfItems: houses.length,
    itemListElement: houses.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: url(routes.house.en(h.slug)),
      name: h.name,
    })),
  };
}

export function graph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization, lodgingBusiness, websiteNode, ...nodes],
  };
}

export function houseGraph(house: House, lang: Lang, faq?: { q: string; a: string }[]) {
  const crumbs = breadcrumbs(lang, [
    { name: site.name, path: routes.home[lang] },
    { name: lang === 'en' ? 'Houses' : 'Casas', path: `${routes.home[lang]}#houses` },
    { name: house.name, path: routes.house[lang](house.slug) },
  ]);
  return graph([houseNode(house), crumbs, ...(faq ? [faqPage(faq)] : [])]);
}
