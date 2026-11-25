# dashpay/dash-wallet: App Connect identity-mismatch dialog, before/after

Branch `feat/app-connect-identity-mismatch-dialog`.

| | |
|---|---|
| Before (exact PR base) | `feat/kotlin-sdk-phase-1` @ `1a309058f2` |
| After (full PR head) | `feat/app-connect-identity-mismatch-dialog` @ `46c59ff056` |
| Build | `assemble_testNet3Debug` from each revision; both installed over each other on the same emulator, so both use the same wallet data |
| Device | Android emulator, API 36 (google_apis x86_64), Pixel 7 profile |
| Network | Dash testnet, live Platform |
| Fixture | A wallet created in-app on that emulator, funded from the testnet faucet, with username `mmproof7x2611` (identity `nE7e2Sw2MYD8ExRSN7vddNFoEboQ57U7Fa7tdNvdxg5`) registered in-app |
| Request | The testnet `dash-key:` vector from `wallet/test/app-connect-vectors.json`, re-dated to the capture time, with an identity hint (TLV 1) of `6UqSZ9wTig2v2rJwNdUDt9WvtGKg3gPjwXLCXhU9LJEL`, an identity this wallet does not have. Opened as a link (`am start -d`). |

- `before/identity-mismatch-toast.png`: the base build shows a toast, "Could not complete the DashConnect request: QR requests a different identity", for about 3.5 s.
- `after/identity-mismatch-dialog.png`: the PR build shows a dialog naming the requested identity and the wallet's username and identity. It stays until dismissed.

SHA-256:
99502b2be7ed610ad912d79f4b78f6ca280b20402877148b0efbe3b31f52f160  before/identity-mismatch-toast.png
abed36fe576648907cbd65e15b9136a220c5b9a1266b502847dbddf35ee0c977  after/identity-mismatch-dialog.png
