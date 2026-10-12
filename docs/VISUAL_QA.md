# Visual QA

Reviewed browser captures are in [`screenshots/`](screenshots/): first views for home and contact plus the port handoff at 1440×900 desktop Chromium and 390×844 mobile WebKit. The mobile images have device pixel ratio 3. The first-visit intro was allowed to clear before capture.

| Finding | Severity | Status |
| --- | --- | --- |
| Mobile header CTA covered the brand and contact desktop grid stayed split on mobile | High | Fixed and recaptured |
| Client-side globe dot generation stalled the first interaction | High | Fixed by precomputing 4,920 land points; interaction tests pass |
| Procedural freight art lacks the intended studio-grade realism | High | Open; original or licensed production assets needed |
| Globe city labels used fixed screen positions | Medium | Fixed; now projected from city coordinates and hidden on the far side in desktop/mobile captures |
| Mobile truck cab is partially cropped during the port close-up | Medium | Open; framing choice needs art review |
| Full 12-checkpoint visual matrix, modal view, all inner-page footers and exact reference parity | Medium | Not yet inspected |
| Stacker spreader crossed the container face and the box lost contact before landing | High | Corrected; cargo-mounted corner locks and the rotating masked boom stay with the box until it settles on the trailer. The photographic boom joint still shows an art seam, so production-grade realism remains open |
| Loaded side-view truck exited right while the road truck entered from left | High | Corrected; the side and overhead projections meet at the same right-side position before the road truck takes the bend. Separate mobile path and loading coordinates keep the vehicle visible in narrow framing |
| Crane cargo missed the deck and ship/aircraft cargo sat outside their silhouettes | High | Fixed in the sampled desktop/mobile frames; deck marker is a child of the ship, and airport cart enters beneath the plane before takeoff |
| Mobile ship cropped outside the frame | High | Fixed with independent mobile vessel scale, position and scroll-driven caption movement |
| Ocean was a dark gradient with seven repeated lines; ship sailed only briefly | High | Replaced with original overhead water imagery, two offset scroll-driven surface layers and a transparent textured wake. The vessel now remains in frame through a longer open-water interval; desktop/mobile sailing frames were inspected. |
| Sea texture stopped moving when scrolling stopped | High | Added real-time swell, shimmer and moving sun glints during the visible sea interval. A held-scroll position changes the water position in desktop Chromium and mobile WebKit; the motion pauses outside the sea and for reduced-motion users. A full-frame turbulence filter was removed after mobile WebKit slowed down. |
| Aircraft appeared abruptly, freight crossed the wing area, and departure occurred too soon | High | Added an offscreen perspective approach, runway-to-apron touchdown, ground shadow, forward fuselage hatch, roller loader, visible freight movement and loader clearance before cloud climb. Intermediate desktop/mobile frames and reverse scrub were checked. |
| After loading, the plane slid away sideways without turning toward its departure path | High | Added a ground yaw into a matching rear three-quarter view, then a forward runway roll, visible lift and climb. The same airfield plate stays in place. Desktop and mobile frames were checked at each step. |
| Phone scrolling and scene animation felt rough | Critical | Reduced offscreen globe rendering and mobile DPR, lowered sea animation work, removed broad full-scene compositor hints, avoided inherited progress-variable and repeated scene attribute writes, and stabilized the pinned viewport height and mobile scrub. Browser-emulated mobile WebKit checks pass; a physical phone performance measurement remains open. |
| Long-form pages felt oversized and too spread out | Medium | Reduced headings, lead copy and section gaps, narrowed article prose to a readable measure, and tightened paragraph/heading spacing. Desktop/mobile article and about captures show no horizontal overflow. |
| Contact controls felt cramped and angular | Medium | Increased internal padding and radius, improved select arrows, and reviewed the desktop/mobile form controls. |

The no-WebGL fallback and development motion HUD were also exercised in desktop Chromium and mobile WebKit. The HUD is available in development at `/?motionDebug=1`.

On 2026-10-11 the [United Carriers homepage](https://unitedcarriers.com/) was scrolled and captured in desktop Chromium. The visible order is reach-stacker pickup from a stack, suspended carry, placement on a waiting trailer, loaded side-view truck departure, a later overhead truck/road view, an already-loaded ship travelling and shrinking into clouds, and a large plane passing over another section. The live homepage does not visibly show a crane loading that ship or cargo entering the plane. Those two local handoffs implement the project's motion contract and remain interpretive. Exact source timing, easing and pixel parity are unverified.

New clean local captures: `screenshots/journey-desktop-{26,35,66,73,83,97}.png` and `screenshots/journey-mobile-{26,66,73,83}.png`. These document the revised trailer, crane, vessel and airport positions without the debug overlay.

The pickup/road correction is documented by clean `screenshots/journey-grip-desktop.png`, `journey-landed-{desktop,mobile}.png`, `journey-perspective-{desktop,mobile}.png`, and `journey-curve-mobile.png`. Intermediate frames were inspected before and after the trailer landing and during the side-to-overhead match; the focused browser check also scrubbed back to the gripped container. Exact source easing and pixel parity remain unverified.

The 2026-10-11 sea/air revision adds reviewed desktop/mobile WebP captures at `screenshots/journey-sea-{passage,departure}-*` and `screenshots/journey-air-{approach,touchdown,load-start,load-enter,takeoff,clouds}-*`. The water and sky plates and transparent wake are original generated assets recorded in `ASSET_REGISTER.md`. The aircraft remains a photo-based SVG layer with perspective transforms; landing gear animation, a true 3D aircraft model, and real-world unit load-device mechanics are not yet production quality. Exact reference pixel parity and physical-device touch/performance remain unverified.

The later sea-motion and reading-layout review used desktop Chromium and mobile WebKit. A held sea frame visibly changes position without scroll input; the focused browser check also covers the contact form, article and about page widths. The moving sea is a layered photographic treatment, not a simulated fluid surface.

The 2026-10-12 takeoff review adds `screenshots/journey-air-{turn,turn-away,roll,rotation}-{desktop,mobile}.webp` and refreshes the takeoff/clouds captures. The turn is checked with only one aircraft visible at a time; the roll moves along the runway before shadow fade and lift. On mobile the caption clears the plane and the lift remains in the viewport. The generated rear view is listed in `ASSET_REGISTER.md`. Browser emulation verifies the sequence, while actual phone frame pacing still needs device measurement.
