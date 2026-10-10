# HANDOFF — Nima Rahgostar

> **IMPORTANT:** Read this file **first** at the start of every Codex session. Update immediately at feature START / DONE / BLOCKED / UNBLOCKED and before context compaction. Track facts, not promises. Engineering specification: `NIMA_RAHGOSTAR_CODEX_MASTER.md`.

## Current state
- **Status:** IN PROGRESS — application foundation underway.
- **Active task:** `NR-001` IN_PROGRESS; app foundation, dependencies, RTL root.
- **Last handoff update:** 2026-10-10 (initial blueprint preparation).
- **Repository/branch/commit:** unknown; Codex to inspect local repo, record state.
- **Build/tests:** NOT RUN — app doesn't exist yet.
- **Demo scope:** Persian RTL logistics marketing demo; enquiry form is local mock only.

## What changed
- Initial detailed specification created with source references, exact routes, brand, motion sequence, code architecture, QA and done criteria.
- Editable original logo SVG created at `assets/nima-monogram.svg`; copy to `public/brand/`.
- No source code or third-party site assets imported; nothing implemented.

## Decisions
- Brand: `نیما راه‌گستر` / `NIMA RAHGOSTAR`; slogan `از مبدأ تا مقصد، یک تعهد.`
- Core build: Next.js App Router + TypeScript + pnpm; GSAP ScrollTrigger; Three.js/R3F globe; Tailwind v4 + CSS Modules; content in typed files.
- Font: variable Estedad headings, variable Vazirmatn body; small readable Persian copy.
- Theme: black/inky navy/blue + muted orange route signals, light editorial contrast.
- Most critical: continuous scroll forklift→truck→port crane→ship→plane; mobile separately re-timed/re-framed.
- 4 fictional office addresses marked *illustrative*, not actual verified business locations.
- Form submits nowhere; present polished success modal with explicit demo disclaimer.
- No use of unlicensed reference screenshots/brand/photos/videos; no invented real partners, employees, sales metrics, payment features.

## Discoveries
- Reference public site built on Webflow; independent analysis attributes Three.js + GSAP, with cinematic dotted globe.
- Agency describes four stages of a single freight journey (forklift, road, maritime, air); mobile version is a separate adaptation, not CSS-scale-down.
- Source images include isolated crane/reach stacker, trucks, wheels, containers, vessel, aircraft and clouds → hybrid layered graphics + real 3D globe recommended.
- Source contains main routes Home/About/Services/Industries/Insights/Careers/Community/Contact; original contact form is a general inquiry, redesigned to Iran-specific form.

## Task queue
Status legend: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`, `UNVERIFIED`.

| Task | Status | Priority | Brief |
| --- | --- | --- | --- |
| NR-001 | IN_PROGRESS | P0 | Setup Next, pnpm, strict TS, folder structure |
| NR-002 | TODO | P0 | Brand, SVG, fonts, tokens |
| NR-003 | TODO | P0 | Header, menu, navigation, transitions, footer |
| NR-004 | TODO | P0 | Dotted Three.js globe + routes + fallback |
| NR-005 | TODO | P0 | Forklift loading |
| NR-006 | TODO | P0 | Truck loading and moving curved highway |
| NR-007 | TODO | P0 | Port crane real container handoff |
| NR-008 | TODO | P0 | Ship and sea→air transition |
| NR-009 | TODO | P0 | Plane, clouds, arrival |
| NR-010 | TODO | P0 | Mobile-specific journey and touch QA |
| NR-011 | TODO | P1 | Remaining homepage editorial interactions |
| NR-012 | TODO | P1 | About |
| NR-013 | TODO | P1 | Services |
| NR-014 | TODO | P1 | Industries |
| NR-015 | TODO | P1 | Insights listing + article detail |
| NR-016 | TODO | P1 | Careers + community |
| NR-017 | TODO | P0 | Iran quote form + mock modal |
| NR-018 | TODO | P1 | Offices + legal + 404 |
| NR-019 | TODO | P0 | Accessibility/reduced-motion/SEO/perf |
| NR-020 | TODO | P0 | Visual parity/screenshots |
| NR-021 | TODO | P0 | Full test/build/e2e |
| NR-022 | TODO | P0 | README/asset licenses/final handoff |

## Remaining work
- Entire application (NR-001..NR-022). **None is done yet.** Work in the queue order. Motion is critical.
- Establish media/asset pipeline with rights registry; don't mark critical scenes complete with placeholders.

## Blockers
- **B-001 (open, quality risk):** Studio-grade original/licensed truck, crane, ship and plane assets not yet created; resolve with procedural models/transparent renders/license-cleared imagery. No authorization to copy original website media.
- **B-002 (open, verification limitation):** Precise original CSS, source packages, timings and all scroll keyframes were not instrumented via a live browser session. Do not claim original source parity; only targeted reference checks after implementation if specific mismatch arises.
- **B-003 (open, demo facts):** Real company office addresses, contacts, partners and performance numbers aren't supplied. Show illustrative addresses/disclaimers, never present invented details as verified.

## Next steps
1. **NOW:** Read the master spec; inspect local working tree/package manager; set NR-001 `IN_PROGRESS` with time and active paths here.
2. Initialize app, base typography/RTL, scripts, lint/test scaffolding. Verify `pnpm dev` & `pnpm build`, log outcome.
3. Copy supplied `assets/nima-monogram.svg` into `public/brand/`, create header/footer and color system.
4. Begin globe → cargo journey **before** lower-priority editorial embellishments. Keep updating this file.

## Important files
- `NIMA_RAHGOSTAR_CODEX_MASTER.md` — authoritative full requirements, exact scene choreography, content, QA.
- `HANDOFF.md` — durable live state (this file, mandatory).
- `assets/nima-monogram.svg` — original brand icon seed.
- `src/components/globe/*` — future interactive globe.
- `src/components/journey/*` — future pinned freight narrative.
- `src/components/contact/*` and `src/lib/validation/contact.ts` — future demo-only form.
- `docs/ASSET_REGISTER.md`, `docs/MOTION_CHECKLIST.md`, `docs/VISUAL_QA.md` — future provenance and QA.

## Verification log
- 2026-10-10 blueprint written; **NO code executed / NO app tested**.

## Update micro-template (copy only when needed)
- `WHEN: ISO timestamp | TASK: NR-xxx | STATUS: IN_PROGRESS/DONE/BLOCKED/UNBLOCKED`
- `CHANGED: paths | WHY: short decision | PROOF: command/result | BLOCKER: exact reproduction or none | NEXT: next file + action`

> Rule: Never omit an update when a feature starts, finishes, hits a blocker, or the blocker is resolved. Before yielding/hitting context limit, record half-complete steps and exact commands.
