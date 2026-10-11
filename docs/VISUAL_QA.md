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
| Loaded truck disappeared during the warehouse-to-road background blend | High | Fixed; cargo remains on trailer as the side-view truck drives out, then the road-view truck enters |
| Crane cargo missed the deck and ship/aircraft cargo sat outside their silhouettes | High | Fixed in the sampled desktop/mobile frames; deck marker is a child of the ship, and airport cart enters beneath the plane before takeoff |
| Mobile ship cropped outside the frame | High | Fixed with independent mobile vessel scale, position and scroll-driven caption movement |

The no-WebGL fallback and development motion HUD were also exercised in desktop Chromium and mobile WebKit. The HUD is available in development at `/?motionDebug=1`.

On 2026-10-11 the [United Carriers homepage](https://unitedcarriers.com/) was scrolled and captured in desktop Chromium. The visible order is reach-stacker pickup from a stack, suspended carry, placement on a waiting trailer, loaded side-view truck departure, a later overhead truck/road view, an already-loaded ship travelling and shrinking into clouds, and a large plane passing over another section. The live homepage does not visibly show a crane loading that ship or cargo entering the plane. Those two local handoffs implement the project's motion contract and remain interpretive. Exact source timing, easing and pixel parity are unverified.

New clean local captures: `screenshots/journey-desktop-{26,35,66,73,83,97}.png` and `screenshots/journey-mobile-{26,66,73,83}.png`. These document the revised trailer, crane, vessel and airport positions without the debug overlay.
