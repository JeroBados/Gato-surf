# Gato Surf Houses · sitio web

Sitio de gatosurfhouses.com. Es estático (Astro), bilingüe (inglés por defecto, español en `/es/`) y reserva a través de **Lodgify**. La web no cobra ni guarda datos: el buscador manda al huésped al motor de Lodgify, que muestra disponibilidad real, cobra y sincroniza con Airbnb y Booking.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

Requiere Node 18.20 o más nuevo.

## Dónde está cada cosa

| Qué | Archivo |
| --- | --- |
| Datos de las 4 casas (nombres, camas, fotos, textos) | `src/data/houses.ts` |
| Textos EN/ES de todo el sitio | `src/i18n/ui.ts` |
| Contacto, dirección, calificación, endoso | `src/config/site.ts` |
| **Conexión con Lodgify** (IDs, subdominio) | `src/config/lodgify.ts` |
| Widgets de Lodgify | `src/components/LodgifySearchBar.astro`, `LodgifyBookBox.astro` |
| Colores, tipografía, espaciado | `src/styles/tokens.css` |
| Estilos de componentes | `src/styles/global.css` |
| Seguridad, caché y redirecciones | `vercel.json` |
| Logo y favicons | `public/brand/`, `public/favicon.*`, `src/assets/brand/` |
| Fotos | `public/images/` |

## Cómo funciona la reserva con Lodgify

Se usan los dos widgets oficiales de Lodgify, con los colores de la marca:

| Dónde | Widget | Qué hace |
| --- | --- | --- |
| Home y Grupos | Search Bar | Busca en las 4 casas y abre los resultados en Lodgify |
| Página de cada casa | Book Now Box | Muestra el precio total por fechas y abre el checkout de esa casa |

Configuración en `src/config/lodgify.ts`:
- `websiteId: 559439` y `websiteSlug: gatosurfhouses` (ya cargados).
- `rentalIds`: Rincón del Surf `641993`, Paraíso del Surf `641992`, Villa de Mar `641990`, Casa Gato Surf `641991`. Si se agrega una casa, su ID sale de Lodgify › Website › Widgets › Book Now Box.
- Si los scripts de Lodgify no cargan, aparece nuestro buscador propio como respaldo (`BookingSearch.astro`), que arma la URL de Lodgify con fechas y huéspedes.

Los scripts y el `<div>` que da Lodgify ya están dentro de `LodgifySearchBar.astro` y `LodgifyBookBox.astro`, con los textos en inglés y español. No hace falta pegar nada más.

### Checklist de lanzamiento (el orden importa)

1. **Subdominio para Lodgify.** En Lodgify › Website › Domain conectar `reservas.gatosurfhouses.com`. Ahí van a vivir los resultados de búsqueda y el checkout.
2. En `src/config/lodgify.ts`, cambiar `bookingBase` a `https://reservas.gatosurfhouses.com`.
3. En Lodgify, poner USD como moneda por defecto (hoy muestra EUR).
4. Listo: los `rentalIds` de las 4 casas ya están cargados.
5. Publicar en Vercel y probar en la URL de prueba (`*.vercel.app`) que los widgets muestran precios. Si en la consola aparece un error de CORS, pedir a soporte de Lodgify que habilite ese dominio.
6. Apuntar `gatosurfhouses.com` a Vercel (DNS). Probar una reserva de punta a punta en inglés y en español.
7. Las redirecciones 301 de `vercel.json` llevan las URLs viejas a las nuevas para no perder Google.

## Seguridad

- Sin servidor, sin base de datos, sin formularios propios: no hay datos que robar.
- El pago ocurre solo en Lodgify (PCI-DSS). La web lo dice debajo del buscador.
- `vercel.json` agrega HTTPS estricto (HSTS), bloqueo de iframes (anti clickjacking), `nosniff`, política de referrer y una Content-Security-Policy que solo permite este dominio y Lodgify.
- Links externos con `rel="noopener"`.

## Publicar en Vercel

1. Subir esta carpeta a un repo de GitHub de la cuenta de Jero (no de terceros).
2. En Vercel: New Project › importar el repo. Detecta Astro solo.
3. Domains › agregar `gatosurfhouses.com` y `www`. Seguir las instrucciones de DNS.

## Pendientes de contenido

- Fotos del point, la playa y el camino de 20 m (hoy no hay ninguna).
- Fotos separadas por casa (hoy las chicas comparten galería y las grandes también).
- Mail del dominio en `site.email`.
- Razón social en `site.legalEntity` y revisión legal del aviso de privacidad.
- Unificar en Airbnb y Booking: 20 m (dicen 50 m), nombres, baños, política de fumar.
