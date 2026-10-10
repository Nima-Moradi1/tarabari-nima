# Visual QA

Reviewed browser captures are in [`screenshots/`](screenshots/): first views for home and contact plus the port handoff at 1440×900 desktop Chromium and 390×844 mobile WebKit. The mobile images have device pixel ratio 3. The first-visit intro was allowed to clear before capture.

| Finding | Severity | Status |
| --- | --- | --- |
| Mobile header CTA covered the brand and contact desktop grid stayed split on mobile | High | Fixed and recaptured |
| Client-side globe dot generation stalled the first interaction | High | Fixed by precomputing 4,920 land points; interaction tests pass |
| Procedural freight art lacks the intended studio-grade realism | High | Open; original or licensed production assets needed |
| Globe city labels are screen overlays rather than projected/occluded 3D labels | Medium | Open |
| Mobile truck cab is partially cropped during the port close-up | Medium | Open; framing choice needs art review |
| Full 12-checkpoint visual matrix, modal view, all inner-page footers and exact reference parity | Medium | Not yet inspected |

The reference was not instrumented in a live browser during this implementation. The supplied specification describes its composition and choreography; exact visual parity is unverified.
