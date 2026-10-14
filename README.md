# Saffron & Soul

Fictional contemporary Indian restaurant frontend built with React 19, TypeScript, TanStack Start, Tailwind CSS v4, Radix Dialog and Lucide.

## Local setup
Requires Node.js 22+ and npm, or Bun.

```sh
npm install
node scripts/prepare-assets.mjs
npm run dev
```

The asset script downloads the committed public photo pointers into static files for independent hosting. Lovable serves those pointers automatically. Generated `public/__l5e/` media should not be committed; add that path and `.vercel/` to your own repository's ignore file.

## Features
- Sticky section navigation, mobile menu, reservation CTA.
- 12 dishes with combinable category and dietary filters, empty state and chef badges.
- Three signature dishes, six-image accessible lightbox and review carousel.
- Validated demo reservations: Indian mobile numbers, local calendar dates, opening-hour slots, 1–20 guests, confirmation reference, submission lock and optional browser persistence.
- Semantic landmarks, visible focus, lazy-loaded photography and reduced-motion support.

## Tests
```sh
npm test
```
Reservation rules and index routing have automated tests. Browser checks exercised all 25 filter combinations, lightbox controls and keyboard/backdrop closing, review controls, validation and successful reservations, browser persistence, mobile navigation, image loading, and layouts at 360, 390, 768, 1024 and 1440px.

## Vercel deployment
Import this repository into Vercel. Choose Node.js 22+ and install command `npm install`. The included `vercel.json` prepares photos, builds using Nitro's Vercel preset and uses `.vercel/output`. If necessary set `NITRO_PRESET=vercel` explicitly in Vercel environment settings. No keys or backend are required. Preserve the existing Vite integration.

Manual build outside Lovable:
```sh
node scripts/prepare-assets.mjs
NITRO_PRESET=vercel npm run build
```
Deployment configuration is provided; no Vercel deployment or public GitHub repository has been created or verified. Check the final production URL after deployment.

## Organisation
- `src/data/restaurant.ts`: typed menu, reviews, gallery.
- `src/components/restaurant/`: reusable site sections and interactions.
- `src/lib/reservation.ts`: validation and date/time rules.
- `src/styles.css`: semantic tokens and responsive layout.
- `scripts/prepare-assets.mjs`: build-time public media mirroring.

## Demo boundaries
Business details, ratings and reviews are illustrative, not verified. Phone and email are labelled demo contacts. The `.example` email is not monitored. Reservations never reach a real restaurant. Up to 50 demo reservations are stored only in this browser; use fictional personal details on shared devices. Food photography is illustrative, not a claim to show every exact dish.

## Photo sources
Free [Unsplash photography](https://unsplash.com/license), downloaded and hosted using the project asset system. Source IDs: `1546833999-b9f581a1996d`, `1603894584373-5ac82b2ae398`, `1599487488170-d11ec9c172f0`, `1517248135467-4c7edcad34c4`, `1414235077428-338989a2e8c0`, `1488477181946-6428a0291777`, `1544145945-f90425340c7e`, `1631452180519-c014fe946bc7`, `1563379091339-03b21ab4a4f8`.
