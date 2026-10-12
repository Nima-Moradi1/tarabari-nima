# Asset register

| Asset | Origin | License / status | Usage |
| --- | --- | --- | --- |
| `public/brand/nima-monogram.svg` | Supplied original editable artwork | User supplied | Header and favicon |
| Journey freight vehicles, warehouse, road, port, ocean and air overlays | Original SVG geometry authored in this repository | Original project artwork | Scrubbed cargo narrative |
| `public/scene/ocean-water-v2.webp` | Original generated overhead open-water image, converted to WebP in this repository | Generated for this project | Ocean surface with scroll-linked parallax and separate real-time swell/shimmer |
| `public/scene/ship-wake-v2.webp` | Original generated transparent foamy ship-wake image, converted to WebP in this repository | Generated for this project | Loaded vessel's wake |
| `public/scene/flight-sky-v2.webp` | Original generated cloud-filled daylight sky image, converted to WebP in this repository | Generated for this project | Aircraft approach and climb |
| `public/scene/plane-landing-v2.webp` | Generated transparent three-quarter aircraft using the local top-view plane as a livery reference, then converted to WebP | Generated for this project | Continuous runway approach, touchdown and ground loading |
| `public/scene/plane-takeoff-turn-v1.webp` | Generated transparent rear three-quarter aircraft using the local landing aircraft as the livery reference, then converted to WebP | Generated for this project | Aircraft yaw, forward runway roll and climb after loading |
| `public/scene/airfield-runway-v2.webp` | Generated daylight airport side-view plate using the local flight sky as a lighting reference, then converted to WebP | Generated for this project | One fixed sky, horizon and runway through the aircraft landing and loading |
| `src/content/globe-points.json` | Generated with `scripts/generate-globe.mjs` from `world-atlas` countries 110m TopoJSON | Natural Earth land data is public domain; package metadata retained in lockfile | Dotted land cloud |
| Estedad Variable | Fontsource package | SIL Open Font License 1.1 | Headings |
| Vazirmatn Variable | Fontsource package | SIL Open Font License 1.1 | Body text |

The scene plates were produced with the built-in image generation tool: overhead open water, a transparent ship wake, a cloud-filled sky, a transparent three-quarter landing aircraft derived from the local aircraft livery, a rear three-quarter view of that same aircraft, and a fixed daylight airfield runway. The takeoff prompt requested a matching white, navy and copper four-engine airliner seen from behind with extended landing gear and a transparent background. They are local project assets. The remaining journey compositing is a motion prototype; source-exact visual parity and physical-device performance remain unverified. No United Carriers media is used.
