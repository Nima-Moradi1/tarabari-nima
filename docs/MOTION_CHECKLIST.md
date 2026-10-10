# Motion checklist

The primary journey is a single pinned GSAP ScrollTrigger timeline with deterministic progress and reverse scrub. Development debug access is `window.__journeyDebug`.

| Progress | Scene | Expected handoff |
| --- | --- | --- |
| .02 / .11 / .19 | Warehouse | Forklift approaches, forks move, cargo lifts |
| .26 / .35 / .43 | Road | Cargo on trailer, truck moves, wheels rotate |
| .52 | Port | Spreader lowers, lifts cargo, truck departs |
| .61 / .69 | Sea / air handoff | Cargo on ship, route changes to air |
| .79 / .89 / .97 | Air / arrival | Plane moves through clouds, CTA appears |

Verification: the Playwright suite scrubbed forward and backward through representative checkpoints in Chromium and mobile WebKit. The port artwork opacity and screenshots were checked at `.52`. Reduced-motion storyboard and no pin were checked in both browsers.

Open issues: the sea-to-air transfer is abbreviated and needs close visual QA; precise contact and occlusion have not been reviewed at every checkpoint. Mobile is separately timed and cropped, but physical-device touch and performance testing remain pending.
