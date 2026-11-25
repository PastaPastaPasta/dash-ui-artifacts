# dashpay/dash-wallet: App Connect identity-mismatch dialog, before/after

Branch `feat/app-connect-identity-mismatch-dialog`.

| | |
|---|---|
| Before (exact PR base) | `feat/kotlin-sdk-phase-1` @ `1a309058f2` |
| After (full PR head) | `feat/app-connect-identity-mismatch-dialog` @ `e2bdbfdd23` |
| Build | `assemble_testNet3Debug` from each revision |
| Device | Android emulator, API 36 (google_apis x86_64), Pixel 7 profile |
| Network | Dash testnet, live Platform |
| Fixture | Before: a wallet created in-app, funded from the testnet faucet, with username `mmproof7x2611` (identity `nE7e2Sw2MYD8ExRSN7vddNFoEboQ57U7Fa7tdNvdxg5`) registered in-app. After: a second testnet wallet created and funded the same way, with username `orphanclaim4829` (identity `Ck5JgC3oeFFZgDHt7vXbwBHbXwsm8jpvtN2Ys6kk9PPi`). The after capture was retaken on that wallet when the dialog moved to Compose; the before build has no dialog, so only the toast is compared. |
| Request | The testnet `dash-key:` vector from `wallet/test/app-connect-vectors.json`, re-dated to the capture time, with an identity hint (TLV 1) of `6UqSZ9wTig2v2rJwNdUDt9WvtGKg3gPjwXLCXhU9LJEL`, an identity this wallet does not have. Opened as a link (`am start -d`). |

- `before/identity-mismatch-toast.png`: the base build shows a toast, "Could not complete the DashConnect request: QR requests a different identity", for about 3.5 s.
- `after/identity-mismatch-dialog.png`: the PR build shows a Compose dialog naming the requested identity and the wallet's username (display form) and identity, with selectable text. It stays until dismissed.

SHA-256:
99502b2be7ed610ad912d79f4b78f6ca280b20402877148b0efbe3b31f52f160  before/identity-mismatch-toast.png
a36b03736c49814ea72dc8c584863c291ca1c03173df55e1d0f46d2df6c17465  after/identity-mismatch-dialog.png
