# Asset register

| Asset | Origin | License / status | Usage |
| --- | --- | --- | --- |
| `public/brand/nima-monogram.svg` | Supplied original editable artwork | User supplied | Header and favicon |
| Journey freight vehicles, warehouse, road, port, ocean and air overlays | Original SVG geometry authored in this repository | Original project artwork | Scrubbed cargo narrative |
| `public/scene/ocean-water-v2.webp` | Original generated overhead open-water image, converted to WebP in this repository | Generated for this project | Ocean surface with scroll-linked parallax and separate real-time swell/shimmer |
| `public/scene/ship-wake-v2.webp` | Original generated transparent foamy ship-wake image, converted to WebP in this repository | Generated for this project | Loaded vessel's wake |
| `public/scene/flight-sky-v2.webp` | Original generated cloud-filled daylight sky image, converted to WebP in this repository | Generated for this project | Aircraft approach and climb |
| `src/content/globe-points.json` | Generated with `scripts/generate-globe.mjs` from `world-atlas` countries 110m TopoJSON | Natural Earth land data is public domain; package metadata retained in lockfile | Dotted land cloud |
| Estedad Variable | Fontsource package | SIL Open Font License 1.1 | Headings |
| Vazirmatn Variable | Fontsource package | SIL Open Font License 1.1 | Body text |

The three new scene plates were produced with the built-in image generation tool from prompts for (1) photorealistic overhead open water with irregular swells and no vessel, (2) a transparent tapered overhead foam wake with no vessel or background, and (3) a realistic cloud-filled daylight sky with open center and no aircraft or ground. They are local project assets. The remaining journey compositing is a motion prototype; source-exact visual parity and physical-device performance remain unverified. No United Carriers media is used.
