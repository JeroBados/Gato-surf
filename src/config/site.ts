// Datos fijos del sitio. Todo lo que el equipo puede necesitar cambiar vive acá o en lodgify.ts.

export const site = {
  name: 'Gato Surf Houses',
  url: 'https://gatosurfhouses.com',
  address: {
    street: 'Calle Coco s/n',
    locality: 'La Saladita',
    region: 'Guerrero',
    postalCode: '40802',
    country: 'MX',
  },
  geo: {
    lat: 17.8423,
    lng: -101.7688,
    mapsUrl: 'https://maps.app.goo.gl/zCQin6aDMmJ2kcQK8',
  },
  whatsapp: {
    number: '+52 56 1107 3849',
    link: 'https://wa.me/525611073849',
  },
  instagram: { handle: '@gatosurfhouses', url: 'https://www.instagram.com/gatosurfhouses/' },
  email: 'gatosurfhouses@gmail.com',
  hostedBy: { name: 'Saladita Rentals', url: 'https://lasaladitarentals.com' },
  rating: { value: '4.9', count: 27, source: 'Google' },
  // Responsable del aviso de privacidad. Confirmar razón social antes de publicar.
  legalEntity: 'Gato Surf Houses',
  checkIn: '3:00 PM',
  checkOut: '11:00 AM',
} as const;

export const waLink = (text?: string) =>
  text ? `${site.whatsapp.link}?text=${encodeURIComponent(text)}` : site.whatsapp.link;
