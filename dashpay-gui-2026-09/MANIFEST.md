# DashPay GUI screenshots for dashpay/dash#7512 PRs

- Build: `dash-qt` from the `feat/platform-client-lib` series, with the
  `dash-platform-cxx` shell (GUI head 26878d980316, QA driver commit
  77d2e8b16698 rebased on top of it)
- Network: Dash testnet (live, `dash-testnet-51`), with real Platform identities,
  DPNS names, profiles and contact requests
- Captured: 2026-09-25/26 (round-2 visual QA, `qa/r4-visual`), macOS, in both the
  Dark and Light themes
- Processing: the full-window captures (4072 px) were scaled down to 1600 px wide
  with `sips` (aspect ratio kept); the dialog captures are at their original
  size.
- Review: every image was opened and checked. None of them shows a mnemonic, a
  typed passphrase or a private key. Identity IDs, usernames, balances and
  funding txids are public testnet data. None of them shows the known-fixed
  defects (consensus error 10405, clipped text, white-on-grey tables).

Layout: `<pr-area>/<theme>-<name>.png`.

## c5-optin: DashPay opt-in (C5)

| Image | Shows |
|---|---|
| `c5-optin/dark-welcome.png`, `light-welcome.png` | DashPay tab before opt-in: the three-step intro and "Enable DashPay for this wallet..." |
| `c5-optin/dark-optin-dialog.png`, `light-optin-dialog.png` | Privacy disclosure opt-in dialog with the acknowledgement checkbox ticked |
| `c5-optin/light-unlock-to-continue.png` | After opt-in on an encrypted wallet: the "Unlock to continue" card, needed to check for an existing username |
| `c5-optin/dark-paused-network-off.png`, `light-paused-network-off.png` | Blocked state: "DashPay is paused while network activity is turned off", actions disabled, "Turn network on" |

## c6-usernames: username registration (C6)

| Image | Shows |
|---|---|
| `c6-usernames/dark-wizard-entry.png`, `light-wizard-entry.png` | Wizard step 1: the name is available, the normalized "Stored as" note (dark), and the optional display name |
| `c6-usernames/dark-wizard-cost.png`, `light-wizard-cost.png` | Wizard step 2: confirm registration with a cost of 0.01 tDASH, plus the funding explanation |
| `c6-usernames/dark-wizard-registered.png` | Wizard step 3: "Username registered" with all four progress steps checked |
| `c6-usernames/light-wizard-registered-log.png` | Step 3 with the timestamped progress log shown, and "Add profile..." |
| `c6-usernames/dark-dashboard-registered.png` | Dashboard after registration: username, display name, credits and the "No contacts yet" empty state |
| `c6-usernames/light-dashboard-no-profile.png` | Registered identity with no profile yet ("Add profile..." prompt) |

## c7-profiles-contacts: profiles and contacts (C7)

| Image | Shows |
|---|---|
| `c7-profiles-contacts/dark-contacts-incoming-request.png`, `light-contacts-incoming-request.png` | Dashboard with contacts, "Requests waiting for you", and an incoming request selected (Accept / Ignore) |
| `c7-profiles-contacts/dark-profile-dialog.png` | Edit profile dialog: display name, public message and character counters |
| `c7-profiles-contacts/dark-find-people-request-sent.png` | Find people: prefix search results capped at 25, and "Contact request sent" confirmation |
| `c7-profiles-contacts/light-find-people-results.png` | Find people: results with profile names and the "Already a contact" note |

## c8-payments: payments, recovery and search (C8)

| Image | Shows |
|---|---|
| `c8-payments/dark-send-username-resolved.png`, `light-send-username-resolved.png` | Send tab: a DashPay username resolved to a fresh contact address ("Paying your DashPay contact...") with label |
| `c8-payments/dark-contact-picker.png`, `light-contact-picker.png` | "@" contact picker: choose a contact to pay |
| `c8-payments/dark-identity-details.png`, `light-identity-details.png` | Identity details: identity, credits, profile, keys table (purpose/security level/used by wallet) and funding payment |
| `c8-payments/dark-disable-confirm.png`, `light-disable-confirm.png` | Disable DashPay confirmation: Cancel is the default and explains how to recover from the recovery phrase |
