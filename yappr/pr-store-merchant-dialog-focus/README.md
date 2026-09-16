# Merchant shipping/payment dialog focus — QA145

Exact base: `d0033afc5e9be1c1b95ae723ff78c121f9ddbbc7` (PR537, shipping/order field labels).
Full head: `e06696b68eafabbba8ec621820c3b0cdc292536d`.
Both revisions were independently built using the tracked devnet environment, served separately, and opened in disposable authenticated merchant62 browser contexts. Session restoration is not login evidence.

Fixture: store `CP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb`, QA Commerce62 Transition Lab, owner `pE4KifoG3Jrvwkse3kng9vJ8wK1M2kBDC9FEeQgfRLC`. Forms use blank unsaved Add Shipping Zone and Add Payment Method drafts. No zone/payment writes occurred.

| Action at 1280 × 900, light theme | Before — exact base | After — full head |
|---|---|---|
| Focus Cancel, press Tab twice in Add Shipping Zone | [Background Yappr link receives focus](before-shipping-tab-focus.png) | [Focus remains inside, on Zone Name](after-shipping-tab-focus.png) |
| Focus Cancel, press Tab twice in Add Payment Method | [Background Yappr link receives focus](before-payment-tab-focus.png) | [Focus remains inside, on Select Type](after-payment-tab-focus.png) |

On the head, each named dialog survived thirty forward and thirty reverse Tab presses without letting focus escape. Escape, Cancel, Close and an outside click each dismissed the dialog and returned focus to its opener. On the base, Escape did not dismiss either panel. Existing shipping Worldwide/Region behavior and payment Custom URI invalid-address feedback were verified and canceled. Pending-save dismissal behavior is unchanged by this patch; the write handlers were not modified.

Additional portrait (390 × 844) and landscape (844 × 390) screenshots show the existing form layouts. Portal rendering also keeps mobile navigation behind the modal overlay. Shipping controls remained usable. The payment panel extends beyond the short landscape viewport; that pre-existing layout issue is tracked separately as QA148, and this PR makes no claim to fix it. Before-run geometry in the JSON was sampled during entrance animation; screenshots were captured after settling, and those early measurements are not used to claim precise final panel bounds.

A first head harness attempt clicked outside immediately after mounting, before Radix installed its outside-pointer listener. The final run waits 400 ms after opening; all four dismissal paths pass. Final `after.json` contains that completed run.

Targeted ESLint, full TypeScript, committed devnet build and independent source review passed. Rebase from staging onto PR537 preserved both changes; only the React import needed combining useId and useRef. All twelve final screenshots were opened at original resolution. No images were edited or annotated.
