// Las cuatro casas. Datos tomados del sitio actual de Lodgify y confirmados por el equipo.

export type Lang = 'en' | 'es';
type T = Record<Lang, string>;

export interface House {
  slug: string;
  number: string;
  name: string;
  size: 'small' | 'large';
  guests: number;
  bedrooms: number;
  baths: number;
  levels: number;
  beds: T;
  card: string;
  gallery: { src: string; alt: T }[];
  summary: T;
  description: T[];
  features: T[];
}

const smallGallery = [
  { src: '/images/small-living.jpg', alt: { en: 'Living room and kitchen under the palapa roof', es: 'Sala y cocina bajo el techo de palapa' } },
  { src: '/images/small-bedroom.jpg', alt: { en: 'Bedroom with platform bed and concrete wall', es: 'Recámara con cama de plataforma y muro de concreto' } },
  { src: '/images/small-bedroom-2.jpg', alt: { en: 'Bedroom with garden window', es: 'Recámara con ventana al jardín' } },
  { src: '/images/small-bath.jpg', alt: { en: 'Bathroom with vessel sink and wooden window', es: 'Baño con lavabo de sobreponer y ventana de madera' } },
  { src: '/images/small-exterior.jpg', alt: { en: 'The row of small palapa houses from the garden', es: 'La fila de casas chicas desde el jardín' } },
];

const largeGallery = [
  { src: '/images/large-exterior.jpg', alt: { en: 'Two-storey palapa house above the shared pool', es: 'Casa de dos plantas sobre la alberca compartida' } },
  { src: '/images/large-bedroom.jpg', alt: { en: 'Upstairs bedroom with wooden windows', es: 'Recámara de planta alta con ventanas de madera' } },
  { src: '/images/large-bedroom-2.jpg', alt: { en: 'Bedroom opening onto the balcony', es: 'Recámara con salida al balcón' } },
  { src: '/images/large-kitchen.jpg', alt: { en: 'Kitchen with island and pendant lights', es: 'Cocina con isla y lámparas colgantes' } },
  { src: '/images/large-bath.jpg', alt: { en: 'Bathroom with round backlit mirror', es: 'Baño con espejo redondo iluminado' } },
];

const smallFeatures: T[] = [
  { en: 'Private terrace with table', es: 'Terraza privada con mesa' },
  { en: 'Full kitchen and dining area', es: 'Cocina equipada y comedor' },
  { en: 'Air conditioning and ceiling fans', es: 'Aire acondicionado y ventiladores' },
  { en: 'Starlink internet, good for video calls', es: 'Internet Starlink, apto para videollamadas' },
];
const largeFeatures: T[] = [
  { en: 'Two floors with private terrace', es: 'Dos plantas con terraza privada' },
  { en: 'Full kitchen and dining area', es: 'Cocina equipada y comedor' },
  { en: 'Air conditioning in every room', es: 'Aire acondicionado en todos los espacios' },
  { en: 'Starlink internet, good for video calls', es: 'Internet Starlink, apto para videollamadas' },
];

export const houses: House[] = [
  {
    slug: 'rincon-del-surf', number: '01', name: 'Rincón del Surf', size: 'small',
    guests: 3, bedrooms: 1, baths: 1, levels: 1,
    beds: { en: '1 bed and a sofa bed', es: '1 cama y un sofá cama' },
    card: '/images/card-rincon-del-surf.jpg',
    gallery: [{ src: '/images/small-terrace.jpg', alt: { en: 'Covered terrace with palms', es: 'Terraza techada entre palmeras' } }, ...smallGallery],
    summary: { en: 'A single-storey house for up to three, twenty meters from the point.', es: 'Una casa de una planta para hasta tres, a veinte metros del point.' },
    description: [
      { en: 'Rincón del Surf is one of the two small houses: one bedroom with air conditioning, one bathroom, a full kitchen and a living area that opens onto a private terrace under the palapa roof.', es: 'Rincón del Surf es una de las dos casas chicas: una recámara con aire acondicionado, un baño, cocina equipada y una sala que se abre a una terraza privada bajo el techo de palapa.' },
      { en: 'Made for a couple or a solo surfer who wants to be in the water early. A sofa bed takes a third guest.', es: 'Pensada para una pareja o para quien viaja solo y quiere estar temprano en el agua. Un sofá cama suma un tercer huésped.' },
    ],
    features: smallFeatures,
  },
  {
    slug: 'paraiso-del-surf', number: '02', name: 'Paraíso del Surf', size: 'small',
    guests: 3, bedrooms: 1, baths: 1, levels: 1,
    beds: { en: '1 bed and a sofa bed', es: '1 cama y un sofá cama' },
    card: '/images/card-paraiso-del-surf.jpg',
    gallery: [{ src: '/images/small-terrace-2.jpg', alt: { en: 'Terrace with wooden table and sliding doors', es: 'Terraza con mesa de madera y puertas corredizas' } }, ...smallGallery],
    summary: { en: 'A single-storey house for up to three, twenty meters from the point.', es: 'Una casa de una planta para hasta tres, a veinte metros del point.' },
    description: [
      { en: 'Paraíso del Surf is a standalone single-storey house: one bedroom with air conditioning, one bathroom, a full kitchen and a private terrace with table and chairs.', es: 'Paraíso del Surf es una casa independiente de una planta: una recámara con aire acondicionado, un baño, cocina equipada y terraza privada con mesa y sillas.' },
      { en: 'It sits just behind the beachfront restaurants, near Marea. A sofa bed takes a third guest.', es: 'Está justo detrás de los restaurantes frente a la playa, cerca de Marea. Un sofá cama suma un tercer huésped.' },
    ],
    features: smallFeatures,
  },
  {
    slug: 'villa-de-mar', number: '03', name: 'Villa de Mar', size: 'large',
    guests: 6, bedrooms: 2, baths: 2, levels: 2,
    beds: { en: '2 queen beds, 2 single beds and a sofa bed on request', es: '2 camas queen, 2 individuales y sofá cama a pedido' },
    card: '/images/card-villa-de-mar.jpg',
    gallery: [{ src: '/images/large-terrace.jpg', alt: { en: 'Ground-floor terrace opening onto the garden', es: 'Terraza de planta baja abierta al jardín' } }, ...largeGallery],
    summary: { en: 'A two-storey house for up to six, twenty meters from the point.', es: 'Una casa de dos plantas para hasta seis, a veinte metros del point.' },
    description: [
      { en: 'Villa de Mar has two bedrooms with queen beds across two floors, two bathrooms, a full kitchen and a private terrace for stretching after a session.', es: 'Villa de Mar tiene dos recámaras con cama queen en dos plantas, dos baños, cocina equipada y terraza privada para estirar después de surfear.' },
      { en: 'Two single beds in the living area and a sofa bed on request make room for families and small groups.', es: 'Dos camas individuales en la sala y un sofá cama a pedido hacen lugar para familias y grupos chicos.' },
    ],
    features: largeFeatures,
  },
  {
    slug: 'casa-gato-surf', number: '04', name: 'Casa Gato Surf', size: 'large',
    guests: 6, bedrooms: 2, baths: 2, levels: 2,
    beds: { en: '2 queen beds, 2 single beds and a sofa bed on request', es: '2 camas queen, 2 individuales y sofá cama a pedido' },
    card: '/images/card-casa-gato-surf.jpg',
    gallery: [{ src: '/images/large-balcony.jpg', alt: { en: 'Upstairs balcony looking down on the pool', es: 'Balcón de planta alta sobre la alberca' } }, ...largeGallery],
    summary: { en: 'A two-storey house for up to six, twenty meters from the point.', es: 'Una casa de dos plantas para hasta seis, a veinte metros del point.' },
    description: [
      { en: 'Casa Gato Surf has two bedrooms with queen beds across two floors, two bathrooms, a full kitchen and a private terrace, with air conditioning in every room.', es: 'Casa Gato Surf tiene dos recámaras con cama queen en dos plantas, dos baños, cocina equipada y terraza privada, con aire acondicionado en todos los espacios.' },
      { en: 'Two single beds in the living area and a sofa bed on request make room for families and small groups.', es: 'Dos camas individuales en la sala y un sofá cama a pedido hacen lugar para familias y grupos chicos.' },
    ],
    features: largeFeatures,
  },
];

export const houseBySlug = (slug: string) => houses.find((h) => h.slug === slug);
