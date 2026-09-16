# QA122 evidence matrix

| Surface | Before revision/state | After revision/state | Shared fixture | Expected visible change |
|---|---|---|---|---|
| Manage Products header | Exact base cf0efbc10b8757137063113ebbd2061e8b87d8f7 | 02e43a8a6ebd3c4cc376c506009fd510422fea4d | Persona62 store CP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb; same104public products | Count100 becomes104 |
| Manage Products list end | Same base; oldest100 only | 02e43a8a6ebd3c4cc376c506009fd510422fea4d | Same104products | Four previously missing products become visible, including QA117 Successful inventory/manage |
| Later-page read failure and recovery | No source-base comparison claimed | Both states on final PR head | Same104products; only second-page read locally aborted | Error+Retry appears, no false empty list; restoring reads+Retry yields104 |
| Full Inventory | Base context only | No change claimed | Same store |104products verifies that Manage100 was incomplete |

Both builds use independent production devnet exports and matching static mapping. Chromium fresh contexts restore the existing merchant62 auth snapshot privately, remapped only to each local origin; DPNS skip flag is retained by the existing test helper. The main comparison has no injected product, request, or response state. A separate failure check locally aborts only the second-page product read and its three retries, then removes interception before Retry; no response data is fabricated. These are read-only checks; no product writes, uploads or fixture cleanup are performed by this task. Commerce QA owns fixture creation and eventual cleanup. Both use1440×1200 desktop and390×844mobile, light theme, scale1, en-US, America/Chicago. Hash is verified via About before captures. No credentials or browser session state are published. Existing mobile Manage toolbar overflow is independently covered by QA120 and remains outside this fix.
