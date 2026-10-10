# HANDOFF — Nima Rahgostar

> Read this file first. Full contract: `NIMA_RAHGOSTAR_CODEX_MASTER.md`. This file records actual state, not acceptance by implication. Initial blueprint is archived in `docs/HANDOFF_HISTORY.md`.

## Current state
- **Status:** PARTIAL — runnable Persian RTL marketing demo; exact reference parity and studio-grade freight art are not achieved.
- **Active task:** None. The remaining quality gates below are open.
- **Updated:** 2026-10-10 13:45 Asia/Tehran.
- **Repository:** Local Git repository on `main`; no remote or deployment exists.
- **Stack:** Next.js 15 App Router, React 19, strict TypeScript, pnpm 11, GSAP ScrollTrigger, R3F/Three.js, Tailwind v4 and CSS Modules.
- **Scope:** Marketing demo only. Inquiry data stays in memory in the browser; no network submission or storage.

## What changed
- Built all declared routes, Persian content models, responsive header/menu, footer, route reveal, legal pages and 404.
- Copied the supplied original logo to `public/brand/nima-monogram.svg`; added bundled Estedad/Vazirmatn fonts and brand tokens.
- Added a real dotted R3F globe using 4,920 precomputed Natural Earth land points, route arcs, pointer movement, back-face-hidden projected city labels and CSS fallback. Precomputation removed a browser interaction stall.
- Built a pinned GSAP journey with one shared marked cargo unit, forklift, truck, crane, ship, abbreviated port-to-air transfer, plane and reverse scroll. Mobile uses separate timing and crop values. Reduced motion shows four readable stages.
- Built service/industry/insight/career/community pages, six sample articles, interactive filters/gallery, and a local-only Iranian inquiry form with validation and modal.
- Added a development-only `?motionDebug=1` HUD for scene/progress/FPS/trigger inspection and pause/resume.
- Saved reviewed desktop 1440×900 and mobile 390×844 home, port and contact captures under `docs/screenshots/`.

## Decisions
- All freight art is original procedural SVG; no United Carriers asset was copied. It is a working motion prototype, not final studio art.
- Four office addresses remain explicitly marked illustrative; no phone, email, partner, employee or operating statistic was invented as fact.
- Sitemap uses `NEXT_PUBLIC_SITE_URL` or localhost. Robots currently disallow indexing because company facts and addresses are demo data.
- Native scroll drives the journey. No extra smooth-scroll library or network backend was added.

## Task queue
`DONE` means functional work was checked; `UNVERIFIED` means an explicit quality or acceptance gate remains.

| ID | Status | Evidence / remaining gate |
| --- | --- | --- |
| NR-001 | DONE | local Git repo, pnpm install, strict TS, lint, build and test scaffold |
| NR-002 | DONE | supplied logo, fonts and palette in all routes |
| NR-003 | DONE | navigation, focus-trapped menu, route reveal and footer browser-tested |
| NR-004 | UNVERIFIED | 3D globe, projected labels and no-WebGL fallback browser-tested; scroll response, arc occlusion and performance remain |
| NR-005 | UNVERIFIED | forklift and cargo animate; physical contact/occlusion needs full checkpoint review |
| NR-006 | UNVERIFIED | truck, wheels and road animate; path tangent/bank fidelity remains |
| NR-007 | UNVERIFIED | crane, spreader and marked cargo visible at .52; all pickup frames need review |
| NR-008 | UNVERIFIED | ship and transfer vignette animate; handoff realism remains |
| NR-009 | UNVERIFIED | aircraft/cloud/arrival sequence coded; full visual review remains |
| NR-010 | UNVERIFIED | mobile WebKit scrub and screenshots passed; physical touch/perf not measured |
| NR-011 | DONE | homepage value/services/reliability/reasons/insights/FAQ sections implemented |
| NR-012 | UNVERIFIED | about content present; cinematic licensed hero media remains |
| NR-013 | UNVERIFIED | 6 services + 6 solutions and anchors present; art/navigation polish remains |
| NR-014 | UNVERIFIED | 12 interactive industries present; unique imagery remains |
| NR-015 | DONE | 6 linked articles, filters and load-more behavior |
| NR-016 | UNVERIFIED | careers/community content and gallery work; licensed photography remains |
| NR-017 | DONE | validation, demo-only dialog and no-POST browser test passed |
| NR-018 | DONE | 4 clearly illustrative offices, privacy, terms and 404 |
| NR-019 | UNVERIFIED | axe/reduced-motion checks pass; perf targets and WebGL failure need measurement |
| NR-020 | UNVERIFIED | 6 captures reviewed and development HUD works; full checkpoint/route matrix and reference parity remain |
| NR-021 | DONE | lint, TS, unit, build and 38 desktop/mobile E2E checks pass |
| NR-022 | DONE | README, asset register, motion notes and this handoff are current |

## Verification
- `pnpm install --offline` — PASS (pnpm still verified lockfile online); lockfile present.
- `pnpm lint` — PASS; local `tsc --noEmit` — PASS.
- `pnpm test` — PASS, 3 unit checks for Iranian phone/form validation.
- `pnpm build` — PASS, 21 static routes/pages generated.
- `pnpm test:e2e --reporter=line` — PASS, 38 checks across desktop Chromium and iPhone-sized mobile WebKit; includes routes, menu, form/no POST, reverse scene labels, axe, reduced motion, no-WebGL fallback and the development HUD.
- Browser captures reviewed at 1440×900 desktop and 390×844 mobile: home, port `.52`, contact first view. See `docs/VISUAL_QA.md`.
- Windows sandbox initially blocked Next/Vitest/Playwright worker spawn (`EPERM`); the same checks passed outside the sandbox.

## Blockers / limits
- **B-001 open:** Studio-grade original/licensed truck, crane, ship and plane art has not been produced. Procedural SVG is functional but below the specified cinematic fidelity.
- **B-002 open:** Precise original CSS/keyframes were not instrumented. Do not claim pixel or source parity.
- **B-003 open:** Real addresses, contacts, services and business claims were not supplied; demo labels must remain.
- **B-004 open:** Physical-device touch, performance budgets and complete 12-checkpoint visual matrix are unverified. No-WebGL fallback passed in automated browsers.

## Next steps
1. Run `pnpm dev` with `?motionDebug=1` and review `window.__journeyDebug.setProgress(p)` at `.02,.11,.19,.26,.35,.43,.52,.61,.69,.79,.89,.97` in both 1440×900 and 390×844; log mismatches in `docs/VISUAL_QA.md`.
2. Replace procedural vehicle art with coherent original/licensed production layers while retaining the shared cargo timeline and provenance in `docs/ASSET_REGISTER.md`.
3. Test globe scroll response, physical touch and measured performance.
4. Obtain verified company details before changing demo disclosures, search indexing or deployment.

## Important files
`src/components/journey/FreightJourney.tsx`, `src/components/globe/GlobeScene.tsx`, `src/content/globe-points.json`, `scripts/generate-globe.mjs`, `src/components/contact/InquiryForm.tsx`, `src/lib/validation/contact.ts`, `tests/e2e/`, `docs/VISUAL_QA.md`, `docs/ASSET_REGISTER.md`.
