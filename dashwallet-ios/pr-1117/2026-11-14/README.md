# dashwallet-ios #1117: rebased onto develop (2026-11-14)

Head `c404ef421`, on develop `d5f92c605`, SDK pinned at platform `dabbec09c`. Scheme `dashwallet-dashpay`, Debug, iOS 27.0 simulator. The status bar was set to 9:41 with `simctl status_bar`.

These are **fixture renders, not live testnet payments.** A test in the app's own test host built the real SwiftUI views from fixed inputs, presented each in a window in light and then dark mode, and captured it with `simctl io screenshot`. The contact is a fixture named `alice`. The wallet is empty, so the fiat values come from the simulator's cached price. The test was not committed. For live testnet payments through the same flow on an earlier head, see `../live-1006/`.

| File | What it shows |
|---|---|
| `confirm-platform-{light,dark}.png` | `SendConfirmSheet` for a 0.02 DASH contact payment from Platform. The network fee is the single-input withdrawal fee (0.004005 DASH) plus the Core fee (0.0000019 DASH), so the total is 0.0240069 DASH. No whole-account preflight is involved. |
| `profile-pay-transparent-only-{light,dark}.png` | The amount step as the contact profile's Pay hosts it (`setContactRecipient(…, transparentOnly: true)`). It pays from Transparent only, so there is no From card. Send → Send to username still offers every balance. |
