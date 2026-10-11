# Motion checklist

The primary journey is a single pinned GSAP ScrollTrigger timeline with deterministic progress and reverse scrub. Development debug access is `window.__journeyDebug`.

| Progress | Scene | Expected handoff |
| --- | --- | --- |
| .02 / .11 / .19 | Warehouse | Stacker approaches and raises the same marked container; trailer comes into place |
| .26 / .35 | Warehouse to road | Container rests on trailer; loaded side-view truck departs while the road enters behind it |
| .43 | Road | Loaded top-view truck follows the road bend |
| .52 / .60 / .66 / .68 | Port | Truck stops; crane spreader contacts, lifts and carries the box; empty truck leaves; cargo lands on ship deck |
| .73 / .79 | Ocean | Marked deck cargo stays within the rotating, travelling ship as it recedes |
| .83 / .87 | Airport | Top-view cart reaches the parked aircraft; cargo disappears under fuselage before takeoff |
| .90 / .97 | Flight / arrival | Plane climbs through clouds, exits and reveals the CTA |

Verification: focused Playwright checks scrub forward and backward in Chromium and mobile WebKit; assert cargo inside the trailer, cargo lifting, deck cargo inside the vessel, and cart hidden before aircraft departure. Clean desktop and mobile screenshots are listed in `docs/VISUAL_QA.md`. Reduced-motion storyboard and no pin were checked in both browsers.

Open issues: the raster reach stacker does not have a separately animated boom or wheels, and the ship-to-air terminal unpacking and aircraft cargo door remain simplified. Exact reference parity, complete checkpoint matrix, physical-device touch and performance testing remain pending.
