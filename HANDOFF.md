# HANDOFF — Nima Rahgostar

> Read this file first. Full contract: `NIMA_RAHGOSTAR_CODEX_MASTER.md`. This file records actual state, not acceptance by implication. Initial blueprint is archived in `docs/HANDOFF_HISTORY.md`.

## Current state
- **Status:** PARTIAL — runnable Persian RTL marketing demo; exact reference parity and studio-grade freight art are not achieved.
- **Active task:** NR-023 — reference-observed freight choreography (PARTIAL; studio art and exact visual parity remain open).
- **Updated:** 2026-10-11 Asia/Tehran.
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
- Reworked the freight timeline: the marked box settles on the trailer before the loaded side-view truck departs across the warehouse/road blend; the overhead truck then follows the curve. At port, a separate animated crane trolley/cables/spreader picks up the same marked box, carries it over a visible water berth, and lands it on the ship deck. The deck marker is nested inside the vessel so it follows rotation, scale and departure. At the airport, a small top-view freight cart approaches the plane's fuselage on an apron; the plane takes off only after the cart has disappeared beneath it. The airfield then gives way to clouds. Mobile ship/plane positions and the sea caption use separate scroll-driven transforms.
- Corrected the user-reported warehouse pickup and road perspective jump: the stacker has a masked, rotating boom and a top-corner gripper attached to the cargo throughout lift/descent; the box lands on the waiting trailer before release. Desktop/mobile road paths start at the loaded truck's right-side handoff position, where the side and overhead projections overlap before the top-view vehicle turns. Mobile loading and road framing have separate coordinates.

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
| NR-005 | UNVERIFIED | top-corner gripper, boom descent and trailer landing pass focused desktop/mobile review; segmented photographic boom still has a visible joint/art seam |
| NR-006 | UNVERIFIED | right-side same-position perspective handoff and mobile curve pass focused browser review; exact reference tangent/bank fidelity remains |
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
| NR-023 | PARTIAL | Live reference sampled; pickup grip, boom articulation, trailer landing and road perspective corrected and checked forward/reverse on desktop/mobile. Exact pixel/source parity, independently turning stacker wheels and production-grade ship/aircraft handoff art remain open. See subtask states below. |

### NR-023 freight subtask states

| Step | Status | Evidence / remaining work |
| --- | --- | --- |
| Live reference observation | DONE | Desktop Chromium scroll sampling at 1440×900: reach stacker lifts from the stack, carries a suspended box, lowers it to a waiting trailer; the loaded side-view truck departs before a later top-view road shot. The overhead ship is already container-loaded and sails/shrinks into clouds; a large plane subsequently crosses a separate section. The live homepage does **not** visibly depict a crane loading that ship or freight entering that plane, so those handoffs are our interpretation of the project motion contract, not copied reference frames. |
| Trailer loading and departure | IMPLEMENTED | The fixed photographic spreader is masked; a cargo-mounted bar locks to the top corners. The segmented stacker boom rotates with the lift and descent, the box settles onto the trailer before release, and the loaded rig departs right. The overhead truck appears at the same screen position, then follows a desktop/mobile road curve. Intermediate forward/reverse browser checks pass; the photographic boom joint remains an art-quality limitation. |
| Port pickup and ship loading | IMPLEMENTED | Spreader and cables lower to the box at `.56`, rise with it at `.60`, travel over the water berth and lower it to the deck by `.68`; the empty truck drives away. Deck cargo stays inside the ship group's bounds at `.73` and moves with the vessel. |
| Vessel travel and airport loading | IMPLEMENTED | Ship rotates into an overhead travelling shot and recedes; the airport apron reveals a top-view freight cart moving to the fuselage hatch at `.83`. It is hidden by `.87` before takeoff; no freight remains on a wing. Terminal unpacking/cargo-door mechanics are simplified visual storytelling. |
| Desktop/mobile review | DONE | Clean captures at `.14/.26/.39` desktop and `.26/.40/.43` mobile in `docs/screenshots/journey-{grip,landed,perspective,curve}-*`, plus earlier sea/air frames. Focused browser checks cover grip release, trailer landing, same-position road handoff, crane lift, deck containment, aircraft loading visibility and reverse scrub. Physical-device touch and source-exact parity remain unverified. |

## Verification
- `pnpm install --offline` — PASS (pnpm still verified lockfile online); lockfile present.
- `pnpm lint` — PASS; local `tsc --noEmit` — PASS.
- `pnpm test` — PASS, 3 unit checks for Iranian phone/form validation.
- `pnpm build` — PASS, 21 static routes/pages generated.
- `pnpm test:e2e --reporter=line` — PASS, 38 checks across desktop Chromium and iPhone-sized mobile WebKit; includes routes, menu, form/no POST, reverse scene labels, axe, reduced motion, no-WebGL fallback and the development HUD.
- Browser captures reviewed at 1440×900 desktop and 390×844 mobile: home, port `.52`, contact first view. See `docs/VISUAL_QA.md`.
- For NR-023 on 2026-10-11: `pnpm lint`, `pnpm exec tsc --noEmit`, `git diff --check`, and `pnpm build` PASS; the focused forward/reverse and visual Playwright checks PASS 4/4 across desktop Chromium and mobile WebKit. The final clean checkpoint images are listed under NR-023 above. The complete older E2E suite was not rerun after this change.
- For the user-reported pickup/road correction on 2026-10-11: `pnpm lint`, `pnpm exec tsc --noEmit`, `git diff --check` and `pnpm build` PASS; focused landing/perspective/reverse and existing visual checkpoint browser checks PASS 4/4 across desktop Chromium and mobile WebKit. A stale server on port 3000 initially prevented post-build development capture; stopping that workspace-local process and starting a fresh dev server restored browser animation. Clean frames were recaptured afterward.
- Windows sandbox initially blocked Next/Vitest/Playwright worker spawn (`EPERM`); the same checks passed outside the sandbox.

## Blockers / limits
- **B-001 open:** Studio-grade original/licensed truck, crane, ship and plane art has not been produced. Procedural SVG is functional but below the specified cinematic fidelity.
- **B-002 open:** Live reference frames and relative choreography were inspected, but the original animation source/keyframes and exact easing/positions were not recovered. Do not claim pixel or source parity. The reference does not visibly show the ship/aircraft loading actions requested here.
- **B-003 open:** Real addresses, contacts, services and business claims were not supplied; demo labels must remain.
- **B-004 open:** Physical-device touch, performance budgets and complete 12-checkpoint visual matrix are unverified. No-WebGL fallback passed in automated browsers.

## Next steps
1. Finish the complete 12-checkpoint matrix and physical-device touch/performance review; compare aircraft hold entry at intermediate scroll values in both directions.
2. Replace the remaining photographic stacker joint/truck sprite with production-grade articulated art, including independently turning wheels, and develop original terminal, vessel and cargo-door art while retaining the attached-cargo timeline and asset provenance in `docs/ASSET_REGISTER.md`.
3. Test globe scroll response and measured performance.
4. Obtain verified company details before changing demo disclosures, search indexing or deployment.

## Important files
`src/components/journey/FreightJourney.tsx`, `src/components/globe/GlobeScene.tsx`, `src/content/globe-points.json`, `scripts/generate-globe.mjs`, `src/components/contact/InquiryForm.tsx`, `src/lib/validation/contact.ts`, `tests/e2e/`, `docs/VISUAL_QA.md`, `docs/ASSET_REGISTER.md`.
