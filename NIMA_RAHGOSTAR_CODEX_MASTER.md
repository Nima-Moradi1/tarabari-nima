# NIMA RAHGOSTAR — Codex implementation master specification

> **Project:** نیما راه‌گستر | NIMA RAHGOSTAR — an immersive Persian RTL freight/logistics website.
>
> **Reference:** https://unitedcarriers.com/ (accessed/researched 2026-10-10)
>
> **Delivery objective:** An exceptionally close **interaction, visual-language, choreography, composition and content-architecture adaptation** of the reference, with original Iranian branding/copy/assets, fully functional navigation and a mock-only contact flow. This is an executable engineering specification, not a brainstorming assignment.
>
> **FIRST RULE:** Read `HANDOFF.md` before doing anything else. Immediately update it as work begins, finishes, gets blocked or is unblocked. Do NOT start with a new investigation, re-planning, architecture debate or exhaustive reread of the reference.

---

## 0. Operating instructions — execute, do not rediscover

You are Codex and you are implementing this site. You have already been given design analysis, information architecture, tech selection, motion direction, content, data and acceptance criteria. **Build it.** Do not answer with a proposal, a plan-only document, Figma-only mockups or a static landing page. Complete all routes and polished interactions. Do not ask what brand name, font, stack, colors, pages, content or motion library to choose.

1. Inspect existing repository *only* for package manager and files; if empty, initialize as specified. Use **pnpm**.
2. Read `HANDOFF.md` and this spec. Check real state, not just a stale checkbox; mark active task `IN_PROGRESS` immediately.
3. Build the foundation, signature hero + freight journey, then other pages and quality checks according to the ready-to-run task queue in section 25. No additional phase-design process.
4. Update `HANDOFF.md` on **START / DONE / BLOCKED / UNBLOCKED**, when files or decisions change, before context compaction, and before ending each session. Keep notes concise and factual.
5. Prioritize **motion fidelity** and the uninterrupted cargo journey. Do NOT substitute cards fading into view or one background video for the central interactive freight sequence.
6. Avoid copying United Carriers' logo, exact marketing prose, customer testimonials, employees, partner endorsements, trademarked photography or proprietary asset URLs into the production result. Reproduce the *design grammar and behavior* using original/licensed assets and Nima Rahgostar identity. If copying assets is expressly authorized by the actual rightsholder, an assets license can be added separately; no such authorization is assumed here.
7. If a particular visual motion moment remains uncertain, first implement the concrete specifications in sections 9–12. Only then, when a *specific mismatch* blocks parity, open the exact reference page/anchor or the designer's one relevant demo. Make a **targeted check**, record evidence in `HANDOFF.md`, and resume work. Do not inspect every page again.
8. All runtime code and visible text are Persian-first `lang="fa" dir="rtl"`. Use English only for engineering identifiers, source comments and small brand sublabel, where needed.
9. A static attractive picture with fake scroll animations is a FAILURE. Interaction must respond to forward/reverse scrolling, refresh, resizing, wheel/touch, navigation and reduced-motion.
10. No actual financial claims, operational tracking, order persistence, quote storage, external form submissions, or fictional customer endorsements should be presented as real services. This is a **marketing demo** until provided with business-verified information.

### What is observed vs specified

**Observed/externally substantiated:** United Carriers uses Webflow; developer/design commentary attributes GSAP and Three.js to the experience; an animated dotted globe; a custom preloader; persistent world-trade/freight theme; a continuous scroll sequence of forklift loading → road → sea → air; layer parallax/cursor responses; an adaptive rather than scaled-down mobile sequence; hover/cursor/footer micro-interactions; heavy condensed typography and a black/white/blue/orange palette. The public HTML exposes sections, images of isolated trucks, containers, reach stackers, cranes, ship, cloud and plane, multiple pages, menus, FAQ, partners, and the contact form.

**Proposed implementation values, NOT reverse-engineered exact source values:** CSS dimensions, scroll pin lengths, camera positions, GSAP durations, shader values, specific color assignments, component structure, full list of original library package names, fps and performance budgets below. These are strong engineering targets to meet the visible character of the experience, *not claims of having recovered the source code*. Do not tell the client exact code/library versions of the original are known.

### Reference materials to consult ONLY when blocked on a specific detail

| Purpose | URL |
| --- | --- |
| Live site / homepage | https://unitedcarriers.com/ |
| Original about | https://unitedcarriers.com/about |
| Original services | https://unitedcarriers.com/services |
| Original industries | https://unitedcarriers.com/industries |
| Original insights | https://unitedcarriers.com/insights |
| Original careers | https://unitedcarriers.com/careers |
| Original community | https://unitedcarriers.com/community |
| Original contact | https://unitedcarriers.com/contact |
| Independent deep design critique incl. screenshots | https://dokle.design/awards/united-carriers-logistics-site-live-globe |
| Agency's homepage/color references | https://dribbble.com/shots/27614374-United-Carriers-2-0-Homepage |
| Agency's original preloader | https://dribbble.com/shots/27617653-Preloader-United-Carriers-2-0 |
| Agency's mobile motion reference | https://dribbble.com/shots/27675939-Mobile-United-Carriers-2-0 |
| Agency's mobile adaptation | https://dribbble.com/shots/27683036-Mobile-adaptation-United-Carriers |
| Agency's micro-interactions | https://dribbble.com/shots/27636916-Micro-interactions-United-Carriers |
| Services art direction | https://dribbble.com/shots/27659516-Services-United-Carriers-2-0 |
| Industries hero | https://dribbble.com/shots/27662604-Industries-hero-United-Carriers |
| Agency's description of four-part continuous story | https://contra.com/discover?locations=Sydney+NSW%EF%BC%8C+Australia+%28ChIJP3Sa8ziYEmsRUKgyFmh9AQM%29&roles=Interactive+Design&view=projects |
| Page showcase, original fonts/technology | https://www.a1.gallery/website/united-carriers |
| Landing page motion recording | https://www.lapa.ninja/video/post/united-carriers/ |

**Known original vs chosen stack:** Original: Webflow (supported), GSAP and Three.js (reported by independent design analysis), BT Steinhart and Helvetica Now (design gallery reporting), additional proprietary/custom scripts **not verifiably enumerated**. Our build: Next.js/React/TypeScript, GSAP ScrollTrigger, R3F/Three.js, CSS and original layered art. This separation matters.

---

## 1. Brand: نیما راه‌گستر

**Official Persian brand:** «نیما راه‌گستر» (use ZWNJ/half-space in راه‌گستر).
**Latin fallback:** `NIMA RAHGOSTAR`.
**Wordmark:** نیما راه‌گستر.
**One-line company descriptor:** «راهکارهای یکپارچه حمل‌ونقل و لجستیک».
**Main slogan:** «از مبدأ تا مقصد، یک تعهد.»
**Alternate editorial hero:** «هر مسیر. هر محموله. یک مسئولیت.»
**Tone:** technically competent, assured, premium industrial, modern, concise. Avoid grandiose unverified promises or fake accolades.

**Logo concept (pre-supplied editable asset):** The `assets/nima-monogram.svg` file is an **original angular N icon** formed by two sturdy uprights + a diagonal road/movement channel + forward arrow. It communicates physical logistics, speed, connections, industry, and the 'N' of Nima. Not a lookalike of the United Carriers mark. Use this as foundation. Do not rebrand from scratch. Header lockup: icon on leading/right edge, wordmark immediately adjacent, tiny `LOGISTICS NETWORK` microcopy if room. Footer: oversized wordmark using font, not a bitmap. Favicon: monochrome icon. Make white-on-dark, navy-on-light variants using currentColor or masks. Render company name with real HTML for perfect Persian shaping. Logo hover: a 5–7px subtle diagonal arrow glide, not constant bounce.

**Identity specifics:** night-dark industrial luxury; electric blue on movement, muted orange on active delivery routes, bright off-white text, thin hairline separators, data terminals in small mono/number style. Dominant oversized image + strong title + precise operational microcopy. Bring the country coverage to **Iran**: تهران، بندرعباس، رشت، نوشهر; and optionally realistic trade destinations تبریز، مشهد، اصفهان، شیراز for map nodes. On the globe, preserve international feel but let four Iranian city nodes lead the story.

**No fake proof:** Use sample/demo stats with label `آمار نمایشی` unless client supplies real metrics. Do not invent brands in the partners area as real partners, quoted customer names, team staff or shipping volumes presented as verified facts.

---

## 2. Non-negotiable technologies and engineering decisions

- **Framework:** Next.js App Router + React + TypeScript (`strict: true`), pnpm, Node active LTS supported by target Next version. Use supported stable versions at implementation time and commit `pnpm-lock.yaml`.
- **Animation:** `gsap`, `ScrollTrigger`, `gsap.context()` with cleanup, `matchMedia()` and scoped React refs. `@gsap/react` / `useGSAP` as appropriate. **One canonical timeline per major scene**. Do not spawn a ScrollTrigger in render paths.
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei` for dotted interactive rotating globe; project required pieces to a 2D lightweight backup on unsupported / constrained devices. Only make other vehicles WebGL if a convincing layer-based composition cannot achieve parity. Quality and responsiveness over gratuitous 3D.
- **Smoothness:** native scroll works first. Optional `lenis` on fine-pointer devices; if used, connect correctly with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` and a single frame loop), disable on touch if it interferes with momentum/accessible input. Never hijack or block wheel gestures.
- **Styling:** Tailwind CSS v4 with named tokens + CSS Modules for animated compositions and shaders. `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/motion.css` (avoid a giant spaghetti global stylesheet). CSS logical properties (inline-start/end) for RTL.
- **Icons:** lucide-react sparingly plus original SVG cargo/route icons. Do not use bulky icon sets.
- **Forms:** `react-hook-form`, `zod`, `@hookform/resolvers`, local mock submission only. Accessible modal via `@radix-ui/react-dialog` or one lean dialog implementation; prefer Radix.
- **Testing:** Vitest + Testing Library for units, Playwright for E2E + screenshot + touchscreen scroll tests, `axe-core`/`@axe-core/playwright` for audit.
- **Quality:** ESLint, Prettier, accessible semantic HTML, SEO metadata, static structured content, variable web fonts packaged/loaded locally. Keep dependencies minimal. Do not add Swiper, Framer Motion, anime.js and GSAP simultaneously. GSAP owns most motion; a lightweight drag carousel may be handcrafted.
- **Content model:** static typed `src/content/*.ts` files. No backend, no CMS, no database, no API credentials and no real post.
- **Asset format:** AVIF/WebP, optimized SVG, compressed GLB/GLTF if 3D other than globe. `next/image` for editorial visuals; use regular image/texture APIs only when necessary for scrubbed animation; `preload` critical small layers.
- **Render split:** 3D canvas and ScrollTrigger logic only in client components, the rest should remain server components for performance and SEO.

### Hard bans

No static screenshot masquerading as the freight story, no single prerecorded video *as the only* scroll experience, no fake links, no unresponsive hover-only functionality, no unbounded rerenders on scroll, no calculating layout from frame-by-frame React `setState`, no invalid Persian reverse glyph ordering, no counterfeit original brand mark, no duplicate body scroll containers, no `position: fixed` page layers trapping taps, no hidden external requests from mock form, no disabling mobile scroll, no links to real United Carriers contact endpoints.

---

## 3. Route structure / information architecture

All required routes (even if content is mock editorial data) must be functional:

| Route | User-facing title | Required features |
| --- | --- | --- |
| `/` | صفحه نخست | globe hero; signature long scroll cargo journey; services; proof points; why us; news; FAQ; CTA; footer |
| `/about` | درباره ما | transport video-style hero; brand story; mission/vision/strategy; values; footprint; team (generic positions, not fake named workers) |
| `/services` | خدمات | port/crane hero; tech/visibility panels; 6 core modes; 6 integrated services; smart navigation/scroll anchors |
| `/industries` | صنایع | forest/road hero; 12 industry categories; sticky active imagery and per-industry detail; inquiry CTA |
| `/insights` | دانستنی‌ها | highlights slider; filters; news cards; load more; static editorial content |
| `/insights/[slug]` | جزئیات مقاله | SEO metadata; title/date/category; hero media; article body; related articles |
| `/careers` | همکاری با ما | photo hero; culture/values; recruitment steps; available roles mock or clearly 'موقعیت فعلی ثبت نشده' |
| `/community` | مسئولیت اجتماعی | partnerships concept; community stories; gallery / carousel and CTA with no false endorsements |
| `/contact` | ارتباط با ما | contact intro; localized quote/enquiry form; modal; 4 Iranian offices |
| `/privacy` | حریم خصوصی | short honest demo/privacy policy |
| `/terms` | شرایط استفاده | honest demo terms |
| `not-found` | پیدا نشد | branded 404 with route back |

Header desktop navigation: `خانه، درباره ما، خدمات، صنایع، دانستنی‌ها، همکاری، مسئولیت اجتماعی، تماس با ما` plus visual separated inquiry CTA `شروع همکاری`. Compact overlay navigation on inner pages; on homepage follow inspiration's small, stacked layout **without burying discovery**. On mobile fixed small logo right + `فهرست` button left; full-screen overlay links + contact CTA; close by X/Escape/back navigation. Active route indicator. Main nav never links to nonimplemented commerce/cart/payment/live tracking; reference's ecommerce widget is peripheral and **excluded** from this mock transport demo, avoiding a misleading fake checkout.

Page transitions: branded clip/path reveal on navigation, do not wait for a slow preload on every route. Preserve browser back/forward, restore or reset scroll appropriately. Reduced-motion shows immediate navigation.

---

## 4. Detailed visual design system

### 4.1 Color tokens (proposed *faithful palette*, not claimed CSS extraction)

| Variable | Hex | Primary usage |
| --- | --- | --- |
| `--ink` | `#000109` | deep black homepage canvas |
| `--coal` | `#07090A` | alt dark surfaces |
| `--navy` | `#061D5E` | depth/route base |
| `--navy-deep` | `#030D62` | luminous globe shadows |
| `--electric` | `#193EB5` | route highlights |
| `--blue` | `#28589E` | active UI |
| `--ice` | `#9FC3DB` | rim/reflection |
| `--sky` | `#6896FA` | glow pin |
| `--paper` | `#E7F0F5` | pale panels and dark text counterpoint |
| `--white` | `#F9F9F9` | titles |
| `--muted` | `#A2B1C5` | secondary copy |
| `--line` | `rgba(231,240,245,.22)` | hairline borders |
| `--signal` | `#A55B3E` | orange freight-route accent |
| `--alert` | `#C99019` | small industrial caution color (rare) |
| `--success` | `#3C9F85` | *only* feedback successes, not brand primary |

Reported agency palettes are available in the reference URLs, especially `#000109 #E7F0F5 #061D5E #28589E #9FC3DB #6498C6`, mobile `#07090A #F9F9F9 #030D62 #193EB5 #6896FA #A43F2B`. Maintain black/blue/off-white dominance and controlled amber/orange details. Avoid SaaS gradients, random purple/neon cards or generic glassmorphism. Use muted photos with subtle film grain selectively.

### 4.2 Fonts / typography

**Persian primary:** `Vazirmatn Variable` self-hosted, weights 300–800. For editorial/H1 use `Estedad Variable` weights 600–900 **if** its font metrics look more geometric at actual size; lock one as heading in design token. Default: heading Estedad, body Vazirmatn. Engineering/data numerals use Vazirmatn tabular or a compact Latin system mono when purely numerical and marked LTR. Never assume original licensed BT Steinhart/Helvetica are transferable.

Suggested token scale (responsive using clamp):

- micro/terminal labels: desktop **10–11px**, mobile 11–12px, letter spacing minimal on Persian; no artificial long letter spacing of Arabic script.
- metadata / nav: **12–13px**, mobile 13–14px.
- body: **14.5–15.5px**, line-height 1.85–2.0 Persian. On small screens minimum 14px.
- lead: 16–19px, line-height 1.75.
- section title: `clamp(2.2rem, 4.8vw, 5.25rem)` on desktop, mobile `clamp(2rem, 8vw, 3rem)`.
- hero title: desktop `clamp(3.2rem, 6.7vw, 7.6rem)` with tight display line-height 1.15–1.28 (Persian glyphs need more room); mobile 38–58px, strongly avoid side clipping.
- uppercase English only for `NIMA RAHGOSTAR`, acronyms, numbers, tiny functional markers. Respect Persian punctuation and half spaces.
- headings slightly bolder but less huge than the English reference; user specifically requests **small, elegant Persian typography rather than oversized body text**.
- Use `font-feature-settings: 'ss01' on` only if actually supported by selected file. Test ligature/diacritics and numbers.

### 4.3 Layout

- Content max width: 1440–1520px; horizontal gutters: 24px at 1440, 40–56px at 1920, 16–20px at mobile.
- Desktop 12-column grid, large asymmetric editorial whitespace; mobile single column with purposeful floating overlays.
- Card border radius: default 0–6px; form elements 8–10px; pill CTA border radius 999px; modals 16–20px. Reference feels sharp, industrial, not a bubbly app.
- Hairlines 1px, varied vertical rhythm, transitions between near-black and pale sections.
- Oversized typography is reserved for hero/section statements. Paragraphs must not be visually massive.
- Buttons: light-filled primary on black, outlined secondary, subtle slide of icon/arrow, 44px min touch height.
- Desktop cursor optional custom mark/trail; **never** replace default cursor on reduced-motion or touch devices.

### 4.4 Breakpoints and orientation

`<480` small mobile, `480–767` mobile, `768–1023` tablet, `1024–1439` desktop, `>=1440` large desktop. Test actual 360×800, 375×812, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, 1920×1080. Also test mobile landscape ~844×390. `100dvh` where supported with `100svh` fallback; respect safe area insets.

---

## 5. Exact homepage architecture / narrative order

The reference is intentionally **one cargo journey rather than unrelated slideshow**. Build the following ordered sections. Some original pages may include responsive duplicated markup; do not duplicate DOM for one experience, just adapt layout and media.

1. **Preloader** — dotted coverage map, pulsating hubs, regions/services and percentage, then reveal hero.
2. **Header/utility strip** — slim status/news line; logo/nav; clear `شروع همکاری` action. For demo, ticker reads `راه‌های تازه برای جابه‌جایی هوشمند کالا در ایران` (no false emergency alerts).
3. **Hero globe** — near-black background, planet on visual **left in RTL** (reference desktop has planet right in LTR). Large Persian headline on right: eyebrow `یک مسیر، یک مسئولیت` / `از مبدأ تا مقصد،` / `همراه هر محموله.` and lead text; CTA `درخواست مشاوره` & `خدمات ما`. Globe has glowing trade lines, bright orange/blue atmospheric edge, labels Tehran/Bandar Abbas/Rasht/Nowshahr.
4. **Cinematic freight journey** — dominant interactive highlight; anchored sticky composition and objects moving with scroll. Forklift loads; road truck moves; freight shifts through terminal onto container ship; plane crosses cloud/wireframe path. Details section 9.
5. **Value statement / elevated transport footage** — light/blue image background with bold `ما فقط بار جابه‌جا نمی‌کنیم؛ مسئولیت مسیر را می‌پذیریم.` and restrained copy.
6. **Metrics band** — three large counters, only as `نمونه نمایشی` until real figures are provided. Use copy `پوشش مسیرهای متنوع`, `هماهنگی یکپارچه`, `پاسخ‌گویی منظم` if avoiding numeric invention; optional demo sample values `۲٬۵۰۰+`, `۹۸٫۲٪`, `۸+` ONLY when visibly tagged fake.
7. **Capabilities / service cards** — six services with animated transport illustrations, hover image shifts, horizontal or stacked flow and crossfade labels.
8. **Reliability interactive tech section** — a top-down truck/road line, track visualization, advantages (`پیگیری شفاف`, `هماهنگی شبکه`, `پشتیبانی مسیر`). No fake live tracking portal.
9. **Warehouse and container choreography** — crane hook lowers, grips/lifts container, containers slide/pin, yard and sea imagery blend; may be integrated with step 4's central sequence, but do not omit it.
10. **Differentiators** — five reasons to work with us with icon and rising captions.
11. **Air segment** — top-view white aircraft enters from below or opposite side, cloud layers separate, slow roll/translate, blue/orange path accent; if integrated above use a visual reprise instead of redundant full simulation.
12. **Testimonials / trust** — replace fake attributed customer quotations by typographic `رویکرد ما` evidence cards; do not steal original named testimonials or corporate logos.
13. **Partners-style motion marquee** — only generic *categories* or hypothetical route-city badges (`بنادر`, `جاده`, `انبار`, `گمرک`, `هوایی`), no invented official brand partnerships.
14. **Insights** — news cards with local logistics topics, hover thumbnails and dates.
15. **FAQ** — 6–8 compact semantic accordion questions.
16. **Final CTA/footer** — near-black or midnight-blue animated logo/lines, contact button, huge custom wordmark, company columns and the four offices. Cursor-reactive elements desktop only.

Original homepage confirmed services include air, ocean, brokerage, warehousing & 3PL, project cargo and domestic transport. Original also contains partner marquees, FAQ, reviews, editorial news and big footer. Retain structural density, but localize claims.

---

## 6. Preloader: purpose, elements, timeline

**Reference observation:** centered grey dotted world map over black; 4 glowing blue regional nodes; two clipped vertical text lists, locations on one side, services on other; percentage counter, then reveal globe hero. Rebuild with Iranian city/region data and an intentional brief intro. Preloader MUST NOT delay every visit.

**Desktop composition:** dark `#000109`; dotted map max 58vw wide centered; small brand mark corner right; clipped list on right `تهران، بندرعباس، رشت، نوشهر، تبریز، اصفهان` with slow vertical scan; other side `جاده‌ای، دریایی، هوایی، گمرکی، انبارداری، پروژه‌ای`; `00 → 100%` small numeric readout upper-left (physical reference placement may be mirrored). Pins gently pulse. Tiny horizontal progress line, no spinner.

**Proposed motion clock** (only after truly necessary font/text/critical textures readiness):

- 0–0.25s map dots reveal mask;
- 0.25–1.0s nodes pulse and lists roll; display 0–65%;
- 1.0–1.7s nodes connect, increment 65–100% tied to readiness, not a false endless percent;
- 1.7–2.15s map shrinks/dissolves as globe grows, overlay clipped away and hero fades/slides into place.
- First visit only per **tab session**, max **2.6 seconds** visual hold. Don't fake progress while assets are still missing; replace with skeleton/poster gracefully. Skip preload entirely if reduced-motion or previous visit. If `sessionStorage` usage is unavailable/blocked, gracefully behave as first time.

**Tests:** no accidental 5–10s blank; no scroll behind overlay; all content accessible after completion; no flashing on browser Back; min FPS and no forced synchronous layouts; programmatic `aria-busy` and fallback skip when JS slow.

---

## 7. Hero / globe implementation — high fidelity

**Layout:** fullscreen stage on desktop ~100svh minimum; ink-black space, sparse small star/dot noise, earth occupying ~55–70% stage, dramatically cropped by visual left edge in RTL. Big headline right on desktop, leading right-aligned. On mobile title upper/right and globe 55–75vw at lower/left, no text overlapping an interactive control. Keep correct art direction rather than merely scaling all elements.

**Globe geometry:** use real lat/lon sampled dots from open-source Natural Earth/GeoJSON world land outlines (reproject to sphere; make a sparse dot cloud, no copyright-borrowed exact reference geo mask). Canvas dpr clamp 1–1.75, preferred InstancedMesh/Points rather than thousands of separate mesh instances; approximate 8–20k points desktop, 2–7k mobile; cap independent draw calls. Dot radius slightly graduated at visible horizon; world as dots rather than solid shaded texture. Tilt about −12° to 15° visually, slow rotation. Implement time-based rotation paused when out of view.

**Atmosphere:** rim glow along geographic limb: warm orange on upper visible edge, blue electric near lower half, use additive shader/transparent layered shell, not enormous blurry DOM overlay. Globe background `#000109` and central dark navy. Countries/route labels tiny pill tags attached to projected 3D coordinates; labels hide behind back of globe and when overlapping. No long city lists floating without geospatial anchor.

**Routes:** curved quadratic/cubic spherical arcs between Tehran and Bandar Abbas/Rasht/Nowshahr, plus 2–4 international hubs (for example Dubai, Istanbul, Shanghai; optional visual network only). Animate head-of-line dash/glowing dot moving along bezier arc, short glowing trails; rare orange accent paths, mostly electric blue. On first reveal arcs draw 0→1 over ~1.1s stagger; gentle auto loops after. Pointer movement creates **subtle** globe camera parallax 2–4° maximum; drag to rotate optional (cursor affordance), no drag that traps vertical touch scrolling. Scrolling transitions the hero into the following scene: headings move slower than globe, globe scales/rotates and dark stage reveals the cargo narrative; reverse works.

**Rendering:** implement `GlobeScene.tsx`, `DottedEarth.tsx`, `TradeArc.tsx`, `GlobeLabels.tsx`, `GlobeFallback.tsx`. `ResizeObserver`, visibility-based pause and GPU disposal. Texture/shader failures → static canvas/poster with *identical visual composition*. Do not require WebGL to reach/contact form.

**Geometry hint:** point from `lat,lon` to radius `r`: `x = r cos(lat) cos(lon)`, `y = r sin(lat)`, `z = r cos(lat) sin(lon)` with consistent scene convention. Curved arc interpolate and normalize, add height `sin(pi*t)*h`; set arc progress by uniform/draw range; ensure perspective and occlusion for labels. Keep city coordinates in a typed config, not scattered.

---

## 8. Film language and interaction rules

The agency describes a **single shipment through four environments**: forklift loading, road, sea, air. The site source exposes isolated reach stackers, 3 container colors, an overhead crane/rail, several truck directions, top-down truck, vessel, airplane and layered clouds. This strongly supports a **hybrid layer-based cinematic sequence** for vehicles plus 3D globe: choosing GSAP-composited transparent layers for many scenes is more faithful and faster than modeling every bolt in realtime WebGL.

**Art pipeline (original asset build):** create clean, consistent original high-resolution transparent layers and depth layers for:

- `cargo-box` **same unique crate/container across all scenes**, with `NIMA RAHGOSTAR` icon decal; see traceable-cargo continuity.
- warehouse floor/backplate, industrial light/shadow, forklift chassis, forks, mast, tires, load shadows;
- top/side view truck cab, trailer, separate wheels, shipping container top/side, road asphalt, road markings, bridge elevated curve, green/blue environment;
- port gantry and spreader hook, ship deck, stacked multi-hue containers, top-down ship, ocean ripples, water highlights;
- sky gradients, 4–7 depth-plane white clouds, top-down cargo aircraft, flight path route and tiny destination markers;
- terminal data UI lines/icon overlays, map outlines, industrial diagrams.

Original art can be authored with SVG/Canvas/WebGL geometric modeling, self-made low-poly 3D pre-renders, licensed stock footage/geometry whose licenses permit use, or generated visual assets with original styling. **Do not remote hotlink** reference CDN production images. All artwork must share one camera/light/grade family per handoff to avoid collage feeling. Print the actual brand mark on truck doors, containers, ship and aircraft decals, consistently perspective-mapped.

**Environment:** elegant, realistic-ish composited objects (not generic emoji/vector cartoons), compressed high-resolution transparent sprites with alpha, transform-origin appropriately defined. Use slight shadows, occlusion layers, motion blur selectively. The project should look like a studio motion design production rather than a children's diagram.

**Animation contract:**

- Scroll distance drives virtual scene time deterministically (GSAP ScrollTrigger `scrub`); no autoplay of the main journey that advances when user stops scrolling.
- When scrolling reverse, return objects **exactly** to earlier scene state, including lift, wheel position, ship and plane, without random resets, flicker or disappearing cargo.
- One master progress source in [0,1]; segment-specific `localProgress = clamp((p-a)/(b-a),0,1)`. No `useState` per scroll tick. GSAP transforms or R3F refs/uniforms only.
- Pin a `JourneyStage` for roughly **600–850vh desktop** across the entire arc and **450–650vh mobile**, adjusted via matchMedia; underlying events mapped to normalized progress. These are implementation targets, not extracted measurements. Avoid overlong inactive scroll regions.
- Section markers can appear as small `01 / آماده‌سازی`, `02 / جاده`, `03 / دریا`, `04 / آسمان`, subtly anchored and accurately updated.
- Preserve object coherence through cross-scene matches (`container` enters frame at same relative x/y/size and corresponding apparent velocity as next scene's starting asset).
- Camera doesn't teleport: use track/pan/scale with 0.04–0.08 progress blends at transitions. Maintain motion direction forward across RTL with deliberate visual semantics (choose right→left world-travel if it complements RTL; no inconsistent flips mid-journey).
- The page scroll is vertical. Do not unexpectedly rotate page, force horizontal user scroll, disable swipe back, or leak through pinned overlays.

---

## 9. Signature cargo journey — shot-by-shot timeline (IMPLEMENT EXACTLY THIS ORDER)

This is the most important implementation specification. Suggested global normalized scrub intervals sum to 1.00. The *continuity requirement* is observed; each precise interval and camera instruction is a deliberate recreation target.

| Global p | On-screen action | Required choreographic detail |
| --- | --- | --- |
| `0.00–0.07` | Establish warehouse | Intro text dissolves out; warehouse light sweeps; freight crate with clear Nima mark sits foreground. Forklift enters from **right** of RTL composition; wheels begin rotating. |
| `0.07–0.15` | Approach load | Forklift decelerates smoothly; shadow grounds tires; forks slide under SAME crate, small settling vibration. Mast rises (not the entire vehicle). Crane/fork must visually touch object. |
| `0.15–0.22` | Lift and handover | Cargo rises 24–32% of crate height; forklift backs; camera trucks sideways tracking it. Trailer is revealed. Forks align with trailer; crate moves with forks and is set down. No cargo teleport. |
| `0.22–0.30` | Truck starts | Trailer hooks with tractor if separate; suspension settles, visible tires rotate with actual scroll movement; cargo sits anchored to trailer. Camera blends side view to isometric / top-down. Road markings begin sliding. |
| `0.30–0.39` | Truck on highway | Truck follows SVG `motionPath` / spline of an elevated curved highway; change heading tangent to path, mild bank if turning; parallax scenery + highway shadows; speed readout `00 → 65 → 90` as **visual graphic only**, label illustrative. |
| `0.39–0.47` | Port approach | Highway and scenery dissolve through a match-cut to container terminal. Truck brakes at crane loading position; wheel rotation slows to zero; forklift/cargo orientation remains spatially logical. |
| `0.47–0.56` | Container transfer | Port crane trolley moves overhead. Spreader lowers with four corner hooks, snaps to container, lifts from truck; the truck departs after cargo is lifted. Container travels over deck; container shadow shrinks as it rises. **Explicit cargo handover.** |
| `0.56–0.66` | Ocean leg | Crane lowers container onto ship stack; ship gains motion while camera gradually zooms to aerial view; blue water moves independently with ripples/wake; horizon subtle. Labels switch to `حمل دریایی`. Cargo decal may reduce to small visible mark. |
| `0.66–0.73` | Sea-to-air continuity | Route curves on water become luminous track lines; ship docks in distance; show abbreviated port-to-air terminal handover using quick layered crane→pallet/ramp, **not** hard cut from ship to plane; maintain single cargo identity even if container changes to freight pallet via intentional unpacking/consolidation vignette. |
| `0.73–0.85` | Aircraft begins | Air freight plane appears from **overhead** with clear fuselage/wing silhouette; freight goes under wing/ramp before take-off, plane accelerates and translates along path with restrained body roll; camera follows smoothly. |
| `0.85–0.94` | Flight through clouds | Clouds in 3–4 depth bands sweep past at different speeds; flight route animates; plane scales/pans across viewport; light blue glow transitions to near-black globe/sky; moving text `مسیر ادامه دارد...`. |
| `0.94–1.00` | Arrival / reveal CTA | Aircraft exits cleanly, end marker glows; freight trajectory resolves into the Nima diagonal logo motif; closing thought `از مبدأ تا مقصد، یک تعهد.` appears; release pin smoothly to following services/editorial content. |

**Important motion sub-details:**

1. Forks **actually go under** the box; correct occlusion in each lift/hand-off (forks behind cargo bottom, front mast partly ahead). Shift lift `y` of cargo and fork together.
2. Wheels rotate about centers proportional to truck displacement and negative on reverse scroll; wheel animation should not spin when parked. Use `rotation = displacedPx / wheelRadiusPx * radiansToDegrees`.
3. Truck nose rotates to follow road path tangent, trailer lags smoothly (separate transform/cab angle) and is grounded by shadows. No CSS marquee pretending to be a driven route.
4. Crane **spreader** is a distinct part; boom/gantry stable while cable lowers/raises; container follows hook only while attached; precisely land on ship stack.
5. Cargo color/mark stays traceable across warehouse, truck, crane, ship and plane. The physical pallet transfer requires one clear change in cargo presentation, not instantaneous hallucination.
6. Plane must move through frame and past cloud occlusion, not just scale stationary image. Flight route with curved glow and markers, slight banking ≤8° unless dramatic reference moment clearly dictates otherwise.
7. Text appears on meaningful beats using opacity + blur 4–8px + translateY 18–36px; not all simultaneously, and is reversed on scrub back. Titles remain readable at 360px width.
8. **Transitions are handovers, not cuts.** At each environment boundary share a frame of common object/camera composition; crossfade only background/environment and adjust grade; camera velocity continuous.
9. Scene atmosphere changes: warehouse cool industrial; sunlit road muted greys/greens; sea saturated slate/blue; air pale blue/cloud white then deep blue; everything shares Nima palette.
10. Scene content layers are clipped to stage bounds; no horizontal scrollbar during scale/translate; use compositor-friendly transform and opacity.
11. At ScrollTrigger refresh, freeze/recompute exact progress. On route changes kill and recreate cleanly. On orientation changes restore scrub state.
12. Smooth wheel scroll, trackpad, scrollbar dragging, PageDown, Space, scrollTo, forward/reverse mobile swipe all lead to consistent positions.

### Suggested implementation architecture (not extra design work)

`FreightJourney.tsx`: pinned root, single `GSAP` master timeline, scene refs.
`WarehouseSequence.tsx`, `RoadSequence.tsx`, `PortSequence.tsx`, `OceanSequence.tsx`, `AirSequence.tsx`, `JourneyHUD.tsx`.
`useFreightTimeline.ts`: create `ScrollTrigger` (start `top top`, end `+=...`, `pin: true`, `scrub: 1` on fine pointer, lower scrub smoothing on touch), register segment changes, cleanup `ctx.revert()`.
`src/lib/motion/trackPaths.ts`: paths and mathematical helpers for motionPath + tangent; if paid MotionPathPlugin is unavailable, compute SVG path point/tangent yourself via `getPointAtLength`; do not depend on unlicensed GSAP premium plugins.
`src/lib/motion/timelineSegments.ts`: structured segment bounds as constants; DOM selectors by refs, never magic text selectors.

Illustrative normalized progress helper:

```ts
export const segmentProgress = (p: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (p - a) / (b - a)));
```

Use an animation blueprint that explicitly defines start/end transform values for every scene. For reversible hand-offs, every layer must have a defined state when its segment is before/active/after. Avoid `onEnter` appending elements or imperative state that does not reverse.

### Completion quality gate (critical)

A reviewer must be able to scrub **both directions** at 0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%, take screenshots, and see a physically comprehensible cargo journey. Mandatory test assertions: cargo is visible in warehouse, is actually placed on trailer, truck moves on road, crane picks container, vessel transports it, aircraft carries journey into sky, CTA emerges without sticky overlap. Do not mark journey DONE if any link is missing.

---

## 10. The rest of the home page: explicit motions

### Story/mission bridge
Aerial highway or sweeping transport photo: image starts at scale ~1.08, moves subtly behind fixed heading, text title splits to short two-line blocks and reveals in staggered line masks. Replace old English with `ما مسیر را مدیریت می‌کنیم؛ شما مقصد را انتخاب کنید.` Copy 2 short readable paragraphs. Highlight one word/underline with advancing blue route line. Each block transitions with no abrupt top/bottom empty zones.

### Stats band
Three separated number cells with 1px dividers. On entering viewport, numeric terminal-like count-up once, but honor motion reduce. Headline stays short. Demo labels visible (`نمونه‌ای از نمایش داده‌ها`) unless actual numbers approved. Icons as tiny grid/dot patterns, no giant rounded widgets.

### Services listing
Six modes: `حمل هوایی`, `حمل دریایی`, `امور گمرکی`, `انبارداری و لجستیک`, `محموله‌های پروژه‌ای`, `حمل جاده‌ای`. Desktop show editorial row/cards with image on hover (translate x/scale 1.05) and numbers `۰۱..۰۶`. Click should open `/services#<slug>`. Mobile tap sets active preview first or go to detail; never require hover to read.

### Reliability
Black stage/white type + a rotating top-down truck/path or nested route diagram; three feature tabs/chips active on scroll/tap: `دید شفاف به مسیر`, `هماهنگی از ابتدا تا انتها`, `پاسخ‌گویی در لحظه‌های حساس`. Reveal icon + short body. This is representational UI, never fake real tracking data.

### Reasons
Five clean numbered rows: `یک نقطه تماس`, `اطلاع‌رسانی روشن`, `شناخت مسیرها`, `هزینه‌سنجی شفاف`, `حل سریع مسئله`. Hover underline and position shift; scroll stagger 50–80ms. No gratuitous floating boxes.

### Partner-style brand track
Use generic mode labels/micro-icons or **verified** logos supplied later. Infinite marquee with pause on hover/touch and reduced-motion fallback static wrap. All layers contain actual aria-visible content. Never claim that airline/shipper logos are partners if not verified.

### News & FAQ
6 editorial cards (typed data) with date and tag; desktop featured story larger, remaining list/grid; mobile swipe carousel or stacked, visible controls. FAQ `<details>` or accessible controlled accordion with single-open policy; arrow rotates, panel height measured, no content jump.

### Footer
Animated continuous horizontal line morphing into diagonal monogram route as user scrolls. Hover/touch reveal on valid links; large Persian wordmark, navigation columns, four-office micro-link row, © current year dynamically, `نسخه نمایشی وب‌سایت` subtle label. Hover/cursor interaction desktop only, keyboard focus equally visible.

---

## 11. Inner pages: each route's visual composition and specific content

### `/about` — درباره ما
Hero uses **low lateral tracking shot beside a moving freight truck** (original art/footage, dark tint), overlay right-aligned title `راه‌ها متفاوت‌اند؛ تعهد ما یکی است.` eyebrow `درباره نیما راه‌گستر`. Short explainer line on opposite side. Camera footage parallax slight, text line reveal. `داستان ما`: two-column text + 2 photo compositions. `مسئولیت‌پذیری`, `شفافیت`, `هماهنگی`; use alternating black/pale panels. `تفاوت ما` big kinetic typography quartet: `برنامه‌ریزی دقیق`, `تیم نزدیک`, `مسیر گسترده`, `استاندارد بالا`. Mission, vision, strategy = 3 alternating editorial-image cards/rows (earth at night, port containers, aircraft); avoid claiming registered national network if no verification. `ارزش‌ها` 5 indexed list items. `حضور در ایران` four cities mapped with routes. `تیم پشت حرکت`: do **not invent employee headshots/names**; illustrated functional positions/roles with clearly generic titles or section `تیمی در کنار مسیر شما`. Closing CTA.

### `/services` — خدمات
Hero: full-bleed port/containers/crane **moving footage or animated scene**; title bottom/right `از جاده تا دریا و آسمان`, short supporting description opposite side. A low-emphasis ticker crossing lower edge. Include `فناوری و شفافیت` with **demo logistics dashboard UI** and route sample (do not mention company using CargoWise/MachShip unless verified). Sticky service selector 6 primary items & 6 integrated solutions. Content as long editorial feature rows: image, category, main proposition, 1–2 paragraphs, micro data badges, action `ثبت درخواست` linking `/contact?service=<key>`.

Six core service copy:
- `حمل هوایی`: مناسب محموله‌های زمان‌حساس؛ هماهنگی مسیر، بارنامه، تحویل.
- `حمل دریایی`: برنامه‌ریزی کانتینری FCL/LCL و هماهنگی بندری؛ نمایش توانمندی به‌صورت معرفی، نه ضمانت خدمات بالفعل.
- `امور گمرکی`: آشنایی با اسناد، طبقه‌بندی و تشریفات؛ بدون ادعای مجوزی که ارائه نشده.
- `انبارداری و لجستیک`: دریافت، تفکیک، بسته‌بندی و توزیع.
- `محموله‌های پروژه‌ای`: بار سنگین، غیرمتعارف، مسیرسنجی و مجوزهای لازم.
- `حمل جاده‌ای`: ارتباط بین شهرها، پایانه‌ها و بنادر ایران.

Six integrated solutions tabs: `تجمیع محموله‌ها`, `کراس‌داک و انتقال مستقیم`, `مشاوره اسناد و انطباق`, `بهینه‌سازی زنجیره تأمین`, `گزارش دوره‌ای`, `بیمه محموله (صرفاً معرفی)`. Use exact anchor IDs: `air, sea, customs, warehousing, project, road, consolidation, crossdock, compliance, optimization, review, insurance`.

### `/industries` — صنایع
Hero: overhead view, **single truck on a straight road flanked by dense green canopy**, near full-width cinematic video/illustration. Big right-aligned `هر صنعت، مسیر خودش را دارد.` and tiny `برای کشف مسیرها اسکرول کنید`. Different green art direction in hero intentionally, return to navy/black UI below. Intro + sticky large media viewport linked to 12 vertical list rows; active category changes image/description with mask reveal. Categories: `پوشاک و مد`, `تجهیزات پزشکی`, `خرده‌فروشی`, `فناوری و الکترونیک`, `انرژی‌های نو`, `خودرو و قطعات`, `معدن و مواد معدنی`, `ساختمان و عمران`, `پروژه‌های ویژه`, `تولید و مهندسی`, `مواد غذایی`, `کشاورزی`. Each gets unique image motif, short reason for special handling, 2–3 service highlights, CTA prefilled category. On mobile each becomes expanded card with static art instead of 12 heavy scroll pins.

### `/insights` & `/insights/[slug]` — دانستنی‌ها
Hero featured carousel, title `از جریان حمل‌ونقل باخبر باشید`, categories `همه`, `حمل جاده‌ای`, `بنادر`, `بازار`, `راهنمای ارسال`, `لجستیک`. 6–8 **clearly editorial/illustrative** local sample articles, e.g. `چطور روش مناسب حمل کالا را انتخاب کنیم؟`, `محموله کانتینری و خرده‌بار چه تفاوتی دارند؟`, `نقش اسناد در ترخیص کالا`, `از انبار تا بندر: چه مراحلی طی می‌شود؟`, `چک‌لیست محموله حساس`, `روش‌های کاهش تأخیر در حمل جاده‌ای`. Dated items can show `مطلب آموزشی` without manufacturing fake 'breaking news'. Filter fully works; `نمایش بیشتر` actually reveals next batch; 3 sample detail routes have unique full readable Persian bodies, rest should also navigate to a real detail page if shown. Thumbnail zoom/clip on hover; maintain aspect ratio and titles not clamped incorrectly.

### `/careers` — همکاری با ما
Hero `با هم مسیرهای بزرگ‌تری می‌سازیم.` with genuinely licensed generic logistics-team footage/photography; don't imply depicted actors are real employees. Sections work environment, 4 professional values, 6 why-join factors, hiring process as 4 steps (`ارسال رزومه`, `گفت‌وگوی اولیه`, `ارزیابی تخصصی`, `آشنایی با تیم`), open roles empty state with `در حال حاضر موقعیت تأییدشده‌ای ثبت نشده است.` CTA mail `mailto:` ONLY if actual email confirmed by owner; otherwise contact enquiry `career`. No fake jobs. If form use same mock modal and explicit demo status.

### `/community` — مسئولیت اجتماعی
Hero `مسیر خوب، اثر خوب.` Multi-panel image cards for *illustrative* areas `حمایت از آموزش`, `ایمنی جاده‌ای`, `محیط‌زیست`, `ارتباط با جامعه محلی`. Mark as `حوزه‌های پیشنهادی فعالیت اجتماعی` not completed company donations. Image gallery 6 cards, prev/next controls, touch drag; empty future partnership card `برای پیشنهاد همکاری گفتگو کنیم`. No fabricated sponsorship of real teams or NGOs.

### `/contact` — ارتباط با ما
Hero `برای حرکت بعدی آماده‌ایم.` Compact contact meta, visually substantial freight team/truck image (licensed/generic with own brand rendered if possible); no fake public hotline/email. A localized inquiry form with smart Iran-specific options, confirmation modal and 4 offices (section 15). Original reference contains inquiry reasons, name/company/email/phone/message, then offices; our form deliberately adapts Iranian fields and transport needs instead of just translating it.

### `/privacy`, `/terms`
Short, meaningful demo text: website is portfolio/demo; no shipment booking/real storage; form inputs are validated **in browser and never submitted**; optional ref number is local demonstration, not actionable; office addresses illustrative; no guarantee of actual services. Accessible link in footer, no copied third-party policy.

---

## 12. Navigation, scroll, hover, transition and gesture specification

**Desktop nav:** top left/right depends RTL content flow; brand/right, menu content visually precise. Entry/sticky header with solid or blurred dark backing after ~48px. `Menu` button triggers overlay panel: full viewport ink background, large staggered Persian nav links with numbers, faint rotating globe/route watermark, contact block, close X. `aria-expanded`, focus trap, Escape, body lock restored, active link indicator. Overlay exits before route transition.

**Scroll:** pinned stages, line and text reveals keyed to viewport; headers shouldn't jitter with transform conflicts. Standard wheel/trackpad/keyboard. Native keyboard scroll preserved, `ScrollTrigger.normalizeScroll` only if justified and verified (default OFF). No scroll snapping that makes content inaccessible. `overflow-x: clip` only where safe. Long main sequence responds to touch inertia. If using Lenis, don't stack CSS smooth scrolling, GSAP smoothing, and Lenis smoothing incoherently.

**Hover:** underlines wipe inline-end to start; image zoom 1.02–1.06; button icon short diagonal; service media swaps fade 150–300ms; data cursor optional monogram-trail with no permanent dom elements leaking; drag affordance only on draggable gallery. Hover never essential for keyboard/touch comprehension. Footer reacts to pointer gently with logo glow/mouse position CSS vars throttled by rAF.

**Page transitions:** brief brand-color wipe or oversized route-line sweep, ~450–650ms max, respects browser history. Prefer Next navigation transition without holding content hostage for images. Loading links/tabs have immediate feedback.

**Reveal rhythms:** text line masks 0.65–0.9s, section media clip/path 0.8–1.3s; stagger max 60–90ms item (no exhausting cascades). On rapid scroll scrub or apply once stable; no missed content left opacity zero. `prefers-reduced-motion` disables intensive parallax and pins or presents simplified static scenes.

**On touch:** vertical swipe controls progression naturally. No forced horizontal gestures for essential content; carousel horizontal drag uses threshold 12–18px and releases page scroll on vertical swipes. Mobile menu tap targets 44×44; form keyboard shouldn't scroll under modal; iOS elastic scroll tested. No heavy cursor follower on mobile. Native click/tap buttons, no hover simulations required.

---

## 13. Mobile-specific art direction and animation — NOT resized desktop

The original agency explicitly states its mobile sequence was **re-timed and re-framed**. Implement separate stage camera and animation coordinate configs for width <768; same story events, different spatial framing.

- Globe: move apparent globe from side crop to lower-middle crop, large enough to feel immersive but headline remains readable. Reduce dot count, route count and bloom. Labels 2 at once maximum.
- Freight scenes: hero objects occupy 70–95% viewport width; desktop wide horizontal camera movement becomes deliberate vertical diagonals or zooms. Do not squeeze forklift/truck into tiny 30% device widths.
- Road: emphasize top-down truck moving along an S bend; road can travel through a vertical corridor, truck held near center while background moves. Pointer hover never required.
- Port: large close-up crane and container at same apparent scale as truck at handover; crane cables visible; less yard background detail.
- Ship: overhead deck/body silhouette held centrally; water and wake provide apparent movement; avoid cropping ship completely.
- Aircraft: wingtip fits 85–95vw at keyframe, slight translate + roll; clouds occlude edges and emphasize speed. Maintain text in safe upper/lower band separate from wings.
- Pin scroll distance shorter and lighter than desktop; JS GSAP matchMedia sets mobile coordinates/timing. On orientation change recalc triggers without jump.
- Fonts: headings 38–58px, body 14–15px, captions min 11px, CTA 44px tall, 16px side gutters minimum.
- Controls: touch carousel drag, tap active industry, easy modal close, native select preferred on small screen, searchable accessible city option where useful.
- Platform: test actual device emulation at 360/375/390/430 widths, and one real mobile browser when possible. On mid-tier phones no memory thrash/crashes. Fallback to poster layers on low-performance devices, not blank screen.

**Mobile must still show 4 cargo stages with nontrivial motion** even when WebGL is reduced. Reduced-motion users should see a coherent illustrated storyboard of the four modes and can access all text and CTA without forced scene playback.

---

## 14. Persian localized content / IA conventions

UI must use meaningful Iranian freight terms, not blind literal translations. Sample consistent copy:

| Context | Exact label/copy |
| --- | --- |
| Hero eyebrow | `نیما راه‌گستر | حمل‌ونقل و لجستیک` |
| Hero heading | `از مبدأ تا مقصد، یک تعهد.` |
| Hero summary | `برای هر محموله، مسیری روشن؛ از برنامه‌ریزی و هماهنگی تا رسیدن به مقصد.` |
| Primary CTA | `درخواست مشاوره` |
| Secondary CTA | `آشنایی با خدمات` |
| Journey item 1 | `آماده‌سازی و بارگیری` |
| Journey item 2 | `مسیر جاده‌ای` |
| Journey item 3 | `بنادر و حمل دریایی` |
| Journey item 4 | `حمل هوایی` |
| Main value heading | `یک مسیر یکپارچه، یک تیم پاسخ‌گو.` |
| Services heading | `هر آنچه برای حرکت بار لازم است` |
| Insights heading | `از دنیای حمل‌ونقل` |
| Contact heading | `بیایید درباره مسیر شما صحبت کنیم.` |
| Final footer CTA | `محموله بعدی، گفت‌وگوی بعدی ماست.` |
| Feedback | `درخواست نمایشی شما ثبت شد` |

Persian `lang="fa-IR"`; English technical abbreviations as `<bdi dir="ltr">FCL</bdi>` or inline span `dir="ltr"` where necessary; phone/mail always `dir="ltr"`, Persian/Latin digits accept normalization in validation. Dates by Intl `fa-IR` when used. Avoid replacing all visual numbers with overly decorative huge Persian glyphs; body readability comes first.

---

## 15. Iran-specific request/quote form, mock semantics, modal and offices

### Form purpose
A credible Iran-oriented **درخواست مشاوره و استعلام حمل** not a translated appointment form. It must validate, simulate brief processing and show a designed confirmation modal; **NEVER send/store** data. No fake promised real callback.

**Fields and behavior** (`name` is technical key):

| Label | Key | Control / validation |
| --- | --- | --- |
| `موضوع درخواست` | `requestType` | required segmented/radio: `استعلام هزینه`, `مشاوره مسیر`, `پیگیری عمومی`, `همکاری تجاری`, `سایر` |
| `نوع حمل` | `transportMode` | required: `جاده‌ای`, `دریایی`, `هوایی`, `ترکیبی`, `نامشخص` |
| `نام و نام خانوادگی` | `fullName` | required, 3–80 chars after trim, supports Persian and spaces |
| `شماره موبایل` | `mobile` | required Iranian `09xxxxxxxxx`, accept +98/0098 input and Persian/Arabic digits then normalize; inline helpful error |
| `نام شرکت یا مجموعه` | `company` | optional <=120 chars |
| `ایمیل` | `email` | optional but if provided valid email (no mandatory foreign-style email) |
| `شهر مبدأ` | `originCity` | required, searchable/native city list, see below |
| `شهر مقصد` | `destinationCity` | required; must differ from origin (unless international flag included; not in initial spec) |
| `نوع محموله` | `cargoType` | required: `عمومی`, `مواد غذایی`, `تجهیزات صنعتی`, `شکننده`, `سنگین/خاص`, `سایر` |
| `وزن تقریبی (کیلوگرم)` | `estimatedWeightKg` | optional numeric 0.1–1,000,000; do not pretend live price quote |
| `زمان مورد نظر` | `urgency` | optional: `عادی`, `اولویت‌دار`, `در حال بررسی` |
| `توضیحات تکمیلی` | `message` | optional max 1000 chars; char count |
| `پذیرش شرایط نسخه نمایشی` | `demoConsent` | checkbox required, explicitly states nothing is transmitted |

**City options:** complete offline list can be data-generated from representative cities: تهران، کرج، قزوین، رشت، نوشهر، ساری، بندرعباس، بوشهر، اهواز، آبادان، اصفهان، شیراز، یزد، تبریز، اردبیل، مشهد، کرمان، زاهدان، اراک، قم، سنندج، همدان، کرمانشاه، گرگان، ارومیه، چابهار، انزلی. Must include four office cities. Autocomplete filtered in Persian with normalizing ی/ي، ک/ك and diacritics. Native select fallback. If transported from services page, default select mode; from industries page prefill cargo type if relevant. No city data API required.

**Validation:** React Hook Form + Zod, inline labels/errors, error summary for screen readers, error scroll into view, `aria-invalid`, no disabled submit indefinitely. Submit:

1. Run local validation and normalize phone, fields.
2. Disable button for mock `650–900ms` local animation. No fetch, no server action, no analytics containing PII, no local/session storage of entered PII.
3. Generate ephemeral demo ref `NIMA-DEMO-<YYMMDD>-<4digits>` in memory for visual UI only (not retrievable/trackable).
4. Open modal after valid input. Header icon/route-line flourish, headline `درخواست نمایشی شما ثبت شد`, summary `این یک نسخه آزمایشی است؛ اطلاعاتی ارسال نشده و پیگیری واقعی انجام نمی‌شود.`; show `شناسه نمایشی`, `مبدأ → مقصد`, `روش حمل`, and buttons `بستن` / `ثبت درخواست جدید`. Provide optional copy of demo ref and announce via aria-live.
5. On `بستن` return focus to Submit; form values remain. On `ثبت درخواست جدید`, clear form, clear ref, close and focus first field. Backdrop/Escape close, no scroll-through on mobile, respects reduced-motion.

**IMPORTANT:** User asked that it *look* as if registered and under review, but don't misleadingly assert actual submission to a real operator. Visual polish and phrase `در صف بررسی (نمایشی)` satisfy this while honest disclaimer clarifies simulation.

### Four office addresses

These are **fictional sample business addresses using real Iranian city/neighborhood/road names**. They have **not** been verified as offices, so display small `نشانی‌های نمونه برای نسخه نمایشی` adjacent to the `دفاتر ما` heading; NEVER add Google Maps place pins implying an actual company occupies them. They can be updated with genuine business addresses before launch.

| City | Label | Display address (illustrative only) |
| --- | --- | --- |
| تهران | دفتر مرکزی | `تهران، خیابان شهید مطهری، حوالی تقاطع میرزای شیرازی، پلاک ۸۲، طبقه ۳` |
| بندرعباس | دفتر جنوب و امور بندری | `بندرعباس، بلوار امام خمینی، محدوده چهارراه فاطمیه، پلاک ۲۴، واحد ۵` |
| رشت | دفتر شمال‌غرب | `رشت، بلوار معلم، حوالی میدان معلم، پلاک ۴۶، طبقه ۲` |
| نوشهر | دفتر شمال و پشتیبانی بندری | `نوشهر، خیابان فردوسی، محدوده میدان آزادی، پلاک ۱۹، واحد ۲` |

Avoid real clickable directions to made-up house numbers. Instead `نمایش محدوده شهر` can optionally open a map search for the **city only**. No invented telephone numbers or working email addresses. Contact cards can show indicative operating times `شنبه تا چهارشنبه، ۹ تا ۱۷` *as demo only*. Set `تماس از طریق فرم` instead of fake hotline. All address text is right-aligned with semantic `<address>` style reset. Grid two columns desktop, one column mobile, thin borders, city index `۰۱..۰۴`, small pulsing location marker.

---

## 16. Content data structures (write once, reuse)

- `src/content/brand.ts`: exact name, slogan, four offices, contact disclaimer, social URLs (empty until approved).
- `src/content/navigation.ts`: items with href, label, hide? and nav category.
- `src/content/services.ts`: 6 core modes, 6 solutions, title, description, icon, media, mode slug.
- `src/content/industries.ts`: 12 entries, title, lead, detail, 3 highlight bullets, thumbnail.
- `src/content/articles.ts`: 6–8 articles with slugs, category/date, hero, summary, full `blocks`, related IDs.
- `src/content/faqs.ts`: 8 FAQ tuples e.g. how estimate delivery time, do you handle port moves, types of documents, mixed loads, heavy equipment, risk mitigation, price criteria, getting in touch. Carefully avoid inventing actual guaranteed offered services.
- `src/content/cities.ts`: offline Iranian city list & city coordinate map for globe. `IranOffice` type with `isDemo: true`.
- `src/lib/validation/contact.ts`: Zod schema + Persian digits normalizer.
- `src/lib/motion/`: reusable master timeline mechanics, media queries, reduced motion.

Article/body, testimonial replacements, hero UI must draw from content files and not hardcoded duplicate strings. Do not connect external dynamic news/CMS since user asked mock-only front end.

---

## 17. Folder layout — adopt directly

```text
.
├── HANDOFF.md                         # mandatory live source of truth
├── NIMA_RAHGOSTAR_CODEX_MASTER.md     # this immutable product spec
├── README.md                          # setup/run/limitations
├── package.json / pnpm-lock.yaml
├── public/
│   ├── brand/{nima-monogram.svg,nima-monogram-light.svg,favicon.svg}
│   ├── media/
│   │   ├── globe/{...}
│   │   ├── journey/{warehouse,road,port,ocean,air}/{layers...}
│   │   ├── about/   services/   industries/   insights/   careers/   community/
│   └── posters/{webgl-fallback.webp,journey-mobile.webp}
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, not-found.tsx
│   │   ├── about/page.tsx, services/page.tsx, industries/page.tsx
│   │   ├── insights/page.tsx, insights/[slug]/page.tsx
│   │   ├── careers/page.tsx, community/page.tsx, contact/page.tsx
│   │   ├── privacy/page.tsx, terms/page.tsx
│   ├── components/
│   │   ├── layout/{Header,SiteMenu,Footer,PageTransition,Ticker,SiteCTA}
│   │   ├── brand/{BrandLogo,LogoTrail}
│   │   ├── globe/{GlobeScene,DottedEarth,TradeArcs,GlobeLabels,GlobeFallback}
│   │   ├── journey/{FreightJourney,WarehouseSequence,RoadSequence,PortSequence,OceanSequence,AirSequence,JourneyHUD}
│   │   ├── home/{ValueHero,Metrics,ServicesPreview,Reliability,Reasons,InsightsPreview,FAQ}
│   │   ├── services/{ServicesHero,ServiceDetail,ServiceNavigation}
│   │   ├── industries/{IndustriesHero,IndustryExplorer}
│   │   ├── contact/{InquiryForm,ContactSuccessDialog,OfficesGrid}
│   │   ├── ui/{Button,Field,Select,Accordion,Carousel,SectionHeading,RevealText}
│   ├── content/{brand,navigation,services,industries,articles,faqs,cities}.ts
│   ├── hooks/{useMediaQuery,usePrefersReducedMotion,useDeviceCapability}.ts
│   ├── lib/{motion,validation,formatters,geo,performance}/...
│   └── styles/{tokens,base,motion}.css
├── tests/
│   ├── e2e/{navigation,journey-scroll,mobile,contact,accessibility}.spec.ts
│   ├── unit/{contact-validation,article-links,segment-progress}.test.ts
│   └── screenshots/                    # optional, gitignore large png
└── docs/{ASSET_REGISTER.md,MOTION_CHECKLIST.md,VISUAL_QA.md}
```

No code needed from another repository. Don't waste tokens researching alternative architecture. Build reusable feature modules; avoid 1000-line `page.tsx` and a single `animations.ts` that controls the entire site by querying global CSS names.

---

## 18. Asset sourcing rules & readiness check

**Critical blocker to quality:** the highest-cost part is studio-grade freight imagery and transparent views, not writing JSX. Start by creating an **asset manifest**: file, scene, source, license, resolution, transparent? and required shot. Persist in `docs/ASSET_REGISTER.md` and `HANDOFF.md`. Do not pretend copyrighted source images can be reused freely. When exact cinematic assets aren't available, implement original procedural SVG/3D or licensed photocomposites rather than using mismatched stock photo rectangles in the hero.

**Asset must-have checklist:** one consistent cargo ID/decal; forklift cutout; truck cab side + top; trailer + separate wheels; crane/reach stacker with moving arm; white/blue/orange containers; port overhead rail; cargo ship top; plane top; 4+ cloud layers; road curves; water/horizon; reusable shadows; interior page wide video/poster. Fonts self hosted. Compress all images, and if needed use layered static sprites for mobile while keeping genuine transform-based choreography.

**Policies:** no hardcoded third-party CDN hotlinks; store author/license information. Small fallback objects are acceptable temporarily but never call the journey DONE with placeholder icons/colored rectangles. Original logo SVG has been provided. If generation tools/Blender available, geometry can be self-created. Prefer reusable procedurally drawn containers, wheels, route lines, terrain and sea where viable. No asset from restricted/no-AI-use source without permission.

---

## 19. Performance, accessibility, SEO, resilience

**Targets** (aim, measure, don't promise): LCP <3s desktop and <4s mid-tier mobile on tested connection, CLS <0.1, INP <200ms under realistic conditions, most visible scroll at ~60fps desktop / ≥30fps on mid-tier mobile with reduced quality, minimal GPU memory. Avoid hard-coded 'perfect 60' claims. Lazy-load all below-fold illustrations and inner-page videos. Desktop visual 3D cap DPR 1.75, mobile 1.25/1.5; pause when hidden, drop pixel ratio adaptively if sustained low FPS. SSR content should be available even with WebGL disabled; poster fallback on failure.

Accessibility: tab order, visible focus, valid heading hierarchy, skip-to-content, aria-expanded and labels, contrast for small labels, all meaningful media alt/captions, decorative layers aria-hidden, native semantics for accordion/form/dialog, focus management, `prefers-reduced-motion`, no focus behind overlays, no scroll trapping. Touch targets ≥44x44. Avoid motion that could trigger vestibular discomfort without opt-out. Tests on Safari and Chrome where possible.

SEO: RTL meta, lang, title templates e.g. `نیما راه‌گستر | حمل‌ونقل و لجستیک`, OpenGraph image original, robots, sitemap with actual pages, schema.org `Organization` + `WebSite` with only truthful static claims. Do **not** publish synthetic addresses as verified `LocalBusiness` structured-data offices. Demo social links empty rather than fake. No third-party tracking/PII analytics. Use Next static generation for articles where possible.

Stable browser behavior: route transitions won't spawn duplicate ScrollTriggers; orientation change doesn't produce ghost transforms; browser reload in middle of pinned freight stage recovers; two rapid route changes don't freeze body scroll; `visibilitychange` pauses WebGL/video loops; escape always closes overlays; browser Back resets correct menu state. No hydration mismatch from random refs, date formatting or client-only media.

---

## 20. Visual and functional testing contract

**Automated E2E checks:**

1. All declared routes return 200 and `<html lang="fa" dir="rtl">`.
2. Every visible navigation/CTA target exists, internal anchors scroll to sections; no 404 within nav.
3. Desktop header menu opens, focus trap works and closes by click/Escape; tablet/mobile menu tap works, back/forward works.
4. Full scroll from top to footer on desktop and mobile without hidden content, overlapping sticky nodes or horizontal scrollbar.
5. **Freight snapshots** at normalized checkpoints 0.02, 0.11, 0.19, 0.26, 0.35, 0.43, 0.52, 0.61, 0.69, 0.79, 0.89, 0.97; the reverse sequence should show correct prior states. Add `data-scene` and debug-only `window.__journeyDebug?.setProgress()` if needed for deterministic screenshot harness; not in public UI.
6. Real mobile scrolling/touch event at 390×844; carousel horizontal pan never prevents vertical page scroll.
7. Form fails visibly on missing required fields, invalid phone, same origin/destination, invalid optional email; succeeds for valid Iranian digits in 09, +98, Persian-digit forms.
8. On submit, no outgoing `fetch`, `XMLHttpRequest`, server action, or localStorage PII; success dialog shows reference/demo text; close/new request buttons work; Enter/Escape behavior correct.
9. Run keyboard-only and axe audits on home and contact; reduced-motion audit and WebGL failure fallback.
10. Set `prefers-reduced-motion`, verify that pins/media do not make content unreachable and reduced-motion storyboard includes all 4 transport stages.
11. Check all images/media and fonts resolve locally, alt and LTR phone/email formatting correct.
12. Browser screenshots against live reference **composition** for target moments, with deliberate visual mirroring for RTL. Avoid 'pass' simply because something vaguely looks like a logistics site.

**Screenshot matrix**: capture per-page first view + footer at 1440×900, 390×844; homepage hero, every journey checkpoint, service list, industry active list, form, modal, mobile menu. In `docs/VISUAL_QA.md`, log each mismatch with screenshot, severity, fixed status. When browser reference can't be accessed live, describe unverified parity as uncertain, don't mark exactness verified.

**Manual quality bar:** brand logo displayed, photographic/procedural quality high, Persian text visually balanced and small but legible, header/menu clear, four cargo stages readable, no jump cut, no mobile crop, no dead controls, modal premium not default browser alert.

---

## 21. Motion debug/tuning guidance (do not skip)

Build a development-only HUD toggled with `?motionDebug=1`: main progress [0..1], scene name, active object IDs, FPS estimate, viewport breakpoint, reduced-motion status, pause/resume. Exclude debug UI from production. Use this to find collisions, bad easing, direction flips, crop errors. Log `ScrollTrigger.getAll().length` between navigation events to detect leaks. Ensure every progress window's first and last frames have matching transforms of cargo in the previous/next visual environment.

For responsive scenes, use normalized design coordinates (e.g. 1920x1080 and 390x844 presets), convert to CSS percentage and `clamp()`; no 100-line sets of hard-coded absolute pixels for dozens of breakpoints. Use transform origin metadata. Keep 3D coordinate system consistent and dedicated functions to project route labels. All GSAP animation values should be reconstructible from initial state on refresh; avoid chained `from()` animations that inherit an accidental live transform at reverse/reentry.

When creating videos/transparent sprites: encode clip with poster; synchronize playback with scroll if truly necessary via controlled currentTime only when decode supported, but **prefer transformable layers for core object motions**. Browser HTML videos cannot guarantee frame-accurate scrubbing on all platforms. If using rendered image sequence for complex cranes, include image-sequence preloader cap and mobile lower-resolution selection; restore sequence frame on reverse. Do not use heavy image sequences for entire site without performance budgets.

---

## 22. Acceptance / definition of DONE

All boxes must be satisfied and documented with test command + result:

- [ ] `HANDOFF.md` is present, read first, and updated during development according to section 24.
- [ ] Nima Rahgostar branding, logo, iconography, fonts, RTL and palette are correctly applied on every route.
- [ ] Home: working interactive globe; scroll-driven continuous **forklift → truck → crane → ship → airplane** journey; physical handoffs; reverse scrubbing; transitions; editorial sections; footer.
- [ ] Every required inner page is polished, responsive, localized, linked and has meaningful content (not three paragraph placeholders).
- [ ] Mobile route/framing/gesture design intentionally differs from desktop and contains the **entire journey**.
- [ ] Iranian quote/enquiry form validates well and produces a premium **mock-only** confirmation modal without sending/storing data.
- [ ] Four fictional local office sample addresses are visible and marked illustrative.
- [ ] Keyboard, reduced-motion, mobile scroll, browser history and WebGL fallback work.
- [ ] Build/typecheck/lint/tests pass; visual QA captures inspected; no severe/critical blockers.
- [ ] README documents running, asset licenses, mock limitations, test results, future real integration points.
- [ ] End state recorded in `HANDOFF.md` with next tasks and exact files.

Stop claiming completion if signature cargo transitions are placeholders, media unlicensed, or mobile cannot finish pinned sequence.

---

## 23. Commands and setup completion

```bash
pnpm install
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm exec playwright test
pnpm build
```

Implement actual `package.json` scripts so `pnpm test` and `pnpm build` work; document browser install (`pnpm exec playwright install`) when needed. Keep `README.md` with minimum Node version, exact run commands and tips for faster graphics fallback. Use deterministic visual tests with animation debug settings, not arbitrary sleep() in E2E tests.

---

## 24. HANDOFF.md is MANDATORY, LIVE, concise

Codex must regard `HANDOFF.md` as **critical durable memory**, not optional. The supplied handoff file in the bundle is the required initial state, and must be placed in repository root. It includes:

- **Current state** — overall status, active task, current branch/commit if available, app build/health.
- **What changed** — key file/code changes since last update and latest test result.
- **Decisions** — stack choices, major motion/asset design decisions with reasons.
- **Discoveries** — observed behavior, constraints or new knowledge.
- **Remaining work** — explicit task IDs with priority and status.
- **Blockers** — details, impact, mitigation, owner/next action.
- **Next steps** — **one concrete next command/action**, then ordered 2–4 actions.
- **Important files** — critical entrypoints, tokens, brand, animation, form, tests.
- **Verification** — what was *actually run* and whether it passed/failed.

Update protocol (strict):

**Before task starts**: mark ID `IN_PROGRESS`, timestamp with ISO date/local or UTC, active files, planned immediate edit.
**After meaningful code edits**: update changed paths, note decisions/discoveries briefly.
**When done**: only mark `DONE` after running its verification or explicitly log `UNVERIFIED` with reason; set next task.
**When blocked**: status `BLOCKED`, exact error/reproduction, attempted fixes, one recommended resolution, avoid spinning tokens indefinitely.
**When unblocked**: mark resolution, regression tests, resume task and update task status.
**Before session ends/context compaction**: write next exact file/line/command, test failures, state of any half-complete motion timeline. No stale status.

Don't rewrite the whole file every 5 lines of code; do edit on each *meaningful state change*. Keep handoff under ~200 lines; if too long archive old changes to `docs/HANDOFF_HISTORY.md`, preserve recent concise state. Do not overwrite or clear blockers/resolved trail without trace. Do not invent completed tasks. Prefer frequent small commits by feature with meaningful messages; update HANDOFF before commit or alongside it.

---

## 25. Deterministic execution queue (NOT a request to plan new phases)

This is the ready-to-execute dependency order. Status tracked live in `HANDOFF.md`.

| ID | Priority | Task | Proof of completion |
| --- | --- | --- | --- |
| `NR-001` | P0 | Setup repo, dependencies, lint/TS, folder tree, font assets | dev/build starts; RTL root and tests scaffold |
| `NR-002` | P0 | Apply brand SVG + wordmark, design tokens, buttons/type | header/footer logo, visual scale |
| `NR-003` | P0 | Header/menu/page transitions/footer | navigation route + menu smoke tests |
| `NR-004` | P0 | Hero globe Three.js and no-WebGL fallback | visible dotted earth, arcs, city labels, mouse and scroll responses |
| `NR-005` | P0 | Warehouse sprites + actual forklift loading | scrub snapshots at 0.02/0.11/0.19 |
| `NR-006` | P0 | Trailer handoff, truck wheels, road path | scrub snapshots 0.26/0.35/0.43 |
| `NR-007` | P0 | Port crane and container transfer | scrub snapshot 0.52; crane interaction coherent |
| `NR-008` | P0 | Ocean shipment and sea→air bridge | scrub 0.61/0.69, seamless cargo continuity |
| `NR-009` | P0 | Plane, clouds, end-logo scene | scrub 0.79/0.89/0.97; reverse scroll |
| `NR-010` | P0 | Mobile journey reframe + touch + performance fallback | screenshots at 390 width; touch E2E |
| `NR-011` | P1 | Rest of homepage with interactions + FAQ | all homepage sections, no dead cards |
| `NR-012` | P1 | About page | intro, values, imagery, four-city network |
| `NR-013` | P1 | Services page | six primary/six integrated, anchors/prefill |
| `NR-014` | P1 | Industries page | 12 sections + sticky/tap controls |
| `NR-015` | P1 | Insights list/details | filters, load more, valid article routes |
| `NR-016` | P1 | Careers and community | honest static content, gallery, working CTAs |
| `NR-017` | P0 | Contact localized form, offline cities, schema | validation + no-network success modal tests |
| `NR-018` | P1 | Offices + privacy/terms/404 | 4 illustrative offices, policy links |
| `NR-019` | P0 | A11y, reduced motion, SEO and perf polish | tests and audit |
| `NR-020` | P0 | Screenshots and interaction parity QA | mismatch log, no severe issues |
| `NR-021` | P0 | Full lint/typecheck/build/e2e + browser navigation | saved commands/results |
| `NR-022` | P0 | README, licensed asset register, final handoff | developer can continue without guessing |

**Critical ordering exception:** NR-017 may run early in parallel with journey development if resources permit, but do not defer it until an imaginary later launch. Journey NR-005 through NR-010 remains the main visual priority. Only one `IN_PROGRESS` owner if single Codex session.

---

## 26. Final instruction to Codex

Do not ask the user to pick a brand or recommend an easier generic template. Do not perform another generalized full website review. Implement **Nima Rahgostar** according to this document, using original legal assets and a disciplined visual QA loop. Keep the spectacular **continuous scroll logistics journey** and mobile reframing as first-class product requirements. The highest-risk feature is the connected freight animation, not the standard page layout. Treat `HANDOFF.md` as mandatory persistent operating state and update at every task start/completion/blocker resolution. Finish with a real runnable repository and concise test evidence; never silently call mock behavior a real backend integration.
