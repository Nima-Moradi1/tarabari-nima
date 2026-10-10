# نیما راه‌گستر — نسخه نمایشی

Persian RTL logistics marketing demo built with Next.js App Router, TypeScript, GSAP ScrollTrigger and React Three Fiber. Requires Node 20+ and pnpm 11.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm exec playwright install chromium
pnpm test:e2e
pnpm build
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin before generating a production sitemap. WebGL falls back to CSS artwork where unavailable. Reduced-motion preference removes the long pinned journey and shows a readable storyboard.

The dots for the globe are precomputed in `src/content/globe-points.json`. If the land source changes, run `node scripts/generate-globe.mjs` before building. The checked-in data avoids expensive geographic calculations during the first browser interaction.

The inquiry form validates in the browser and creates an ephemeral demonstration reference. It does not send or store personal information. Office addresses are illustrative. No live quotation, booking, tracking, employment, partnership or operational claim is provided. See [asset register](docs/ASSET_REGISTER.md), [motion checklist](docs/MOTION_CHECKLIST.md), and [visual QA](docs/VISUAL_QA.md). Production-grade freight imagery, projected globe labels and exact reference parity remain open art/QA work.
