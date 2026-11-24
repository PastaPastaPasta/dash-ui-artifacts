# dash-sites PR 3: sign in with a mobile wallet

Captures for https://github.com/PastaPastaPasta/dash-sites/pull/3.

- Before: exact base `305af072aa4ba7fe54a3cbea5aebc4bf6eb53a9d`, as deployed at https://dash-sites.thepasta.org/ by the Builder workflow run for that commit.
- After: PR head `6aa7a04b1c72f7c0bf72b70280c01b5f81281a8d`, the production build of `packages/builder` served from a local static server (which is why the page names `127.0.0.1:18520` as its address).
- Network: Dash Platform testnet. All identities, names and balances are testnet test data.

## comparison/

Headless Chromium, fresh profile, no sign-in. Desktop is 1280x800, phone is 390x844 at 2x with a touch pointer.

| File | Shows |
|---|---|
| `before/signin-*.png` | Step 1 on the base: only the identity and private key form |
| `after/signin-*.png` | Step 1 on the PR head: "Sign in with DashPay" first, the key form folded away |
| `after/code-*.png` | After pressing the button: the QR code; on the phone also "Open DashPay on this device" |
| `after/key-fallback-desktop-light.png` | "Sign in with a private key instead" opened |

The countdown text in `after/code-*.png` was frozen at 10:00 for the capture; nothing else was altered.

## real-wallet/

One uninterrupted run: headed Chrome on the PR head build, and DashPay for Android 11.9.2 (testnet build, `hashengineering.darkcoin.wallet_test`) on an Android 16 emulator, restored from a testnet wallet that owns identity `AkhihKhRLGjKB1WTdUG7BWrGnTaTTHcMzdSBsKSJ5GNm` (`p2p.dash`). The request reached the wallet as the `dashpay://connect` link the page shows (the emulator has no camera to point at the QR code; the link and the code carry the same text).

| File | Shows |
|---|---|
| `1-builder-start.png` | Builder, signed out |
| `2-builder-code.png` | Builder showing the sign-in code |
| `3-wallet-approve.png` | DashPay: "Approve connection to "Dash Sites"?", app id = the dash-sites contract, 0.2 DASH limit, expiry |
| `7-wallet-connected.png` | DashPay: Connections, Active, "Dash Sites" |
| `4-builder-confirm.png` | Builder: "A wallet answered as p2p.dash, ..." with Continue / That is not me |
| `5-builder-signed-in.png` | Builder signed in with the wallet's key, allowance shown, no name registration |
| `6-builder-published.png` | A page published to `builder2026.dash` with that key (cost 0.00148 DASH) |
| `browser.mp4` | The browser side of the run |
| `wallet.mp4` | The wallet side of the run |

On chain after the run: identity key 14 is `ECDSA_HASH160`, AUTHENTICATION, HIGH, bound to contract `3JRHRkyYZiwGS6xYQwNq2shemQ5mhGv36yK6VBweVtzx`, total budget 20,000,000,000 credits, expires 2027-02-22; the key the same browser was given by the previous sign-in (key 11) was disabled in the same identity update.
