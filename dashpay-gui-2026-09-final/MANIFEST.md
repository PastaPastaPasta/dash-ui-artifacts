# DashPay GUI screenshots: final set for the dashpay/dash#7512 PRs

- Build: `dash-qt` from the `feat/platform-gui-stack` series, GUI head
  `edf805edfe3a` (the C8 commit), linked against `dash-platform-cxx` from
  dashpay/platform#4633. The QA driver commit `df958d4aa333` sits on top of it
  and changes no product source.
- Network: live Dash testnet (`dash-testnet-51`, Platform protocol version 13).
  Identities, DPNS names, profiles, contact requests and payments are real.
- Interop: the DashPay iOS app (iOS Simulator), talking to the same testnet
  identities.
- Captured: 2026-09-28, macOS, in the Dark and Light themes.
- Processing: full-window captures (2560 px) were scaled to 1600 px wide with
  `sips`, keeping the aspect ratio. Dialog and iOS captures are at their
  original size.
- Review: every image was opened and checked. None shows a mnemonic, a typed
  passphrase, a private key, a raw error or clipped text. Identity ids,
  usernames, addresses and balances are public testnet data.
- The contact picker shot was taken before the profile-name edit test, so the
  iOS contact is "iOS Tester" in Dark and "iOS Tester Three" in Light.

The layout is `<theme>/<name>.png`. `dark/` and `light/` use the same names.

| Image | Shows | PR |
|---|---|---|
| `optin-dialog.png` | The Enable DashPay dialog: what the evonode answering a request can see, and that DashPay uses Core's network settings and proxy. The consent box is ticked. | C5 |
| `options-dashpay.png` | Options → Wallet → DashPay group: "DashPay is on for wallet …" with Disable DashPay… | C5 |
| `registration-entry.png` | Username wizard step 1: the username is available, with "Stored as" and a display name filled in | C6 |
| `registration-progress.png` | Wizard step 3 in progress: funding and identity ticked, "Reserving your username" | C6 |
| `registration-registered.png` | Wizard "Username registered": all four steps ticked, then Done | C6 |
| `dashboard-empty-contacts.png` | A newly registered user: "No contacts yet" with Add contact… | C6, C7 |
| `dashboard-contacts.png` | An identity created in the iOS app, restored from its seed in dash-qt, with 5 Connected contacts | C7 |
| `add-contact-results.png` | Add contact search for "qai": the Note column shows "Already a contact" and "This is you" | C7 |
| `send-pay-contact.png` | The Send tab paying contact `qaios20342` at a fresh DIP-15 address, labelled "qaios20342 (DashPay)" | C8 |
| `send-contact-picker.png` | The "Pay a DashPay contact" picker | C8 |
| `identity-details.png` | Identity details: identity, balance, profile, and the keys table with "Used by this wallet" | C8 |
| `dark/add-contact-request-sent-after-recovery.png` | A wallet restored from its seed: Add contact shows the unanswered request sent before the restore as "Request sent" | C8 |

## interop/

| Image | Shows |
|---|---|
| `interop/ios-contacts-with-dashqt-user.png` | iOS DashPay My Contacts listing Leo Desktop / `qaleo08674` and the other dash-qt users |
| `interop/dashqt-contacts-with-ios-user.png` | dash-qt wallet `qa-leo` showing `qaios20342 \| iOS Tester Three \| Connected` |
| `interop/ios-history-received-from-dashqt.png` | iOS home: "Received from Leo Desktop +0.004", a DIP-15 contact payment sent from dash-qt |
