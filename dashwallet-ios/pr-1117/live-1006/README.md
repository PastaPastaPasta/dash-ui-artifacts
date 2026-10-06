# dashwallet-ios #1117: pay DashPay contacts from Platform and Shielded balances (live testnet, 2026-10-06)

These are real testnet wallets and transactions. There are no fixtures, mock balances or capture patches. The status bar was set to 9:41 with `simctl status_bar`.

## Builds

| | dashwallet-ios | SDK (`../platform`) |
|---|---|---|
| Before | `develop` `3df12fc89` | `v5.1-dev` `6499c680c6` (platform#4623 merge) |
| After | `feat/dashpay-any-balance`: payments ran on `3b4b0f262`, the final head is `fe618b73f` | same |

`fe618b73f` differs from `3b4b0f262` only by the restart-proof contact lock (unresolved withdrawals from the last 24 h lock payments to that contact). That build was relaunched on the sender, and the contact flow opened normally (From step, amount, Continue enabled) without sending.

Scheme: `dashpay`, Debug, iPhone 16 Pro, iOS 26.5 simulator, PIN 1111.

## Wallets

- Sender `Pasta-anybal-send-1006` and recipient `Pasta-anybal-recv-1006`. Both were registered through the app, and the contact request was sent and accepted through the app.
- Sender balances before paying: Transparent 0, Platform 0.51764224, Shielded 0.45.
- The before simulator is an `xcrun simctl clone` of the sender, so it holds the same wallet.

## Screens

| File | What it shows |
|---|---|
| `before-contact-amount-zero-transparent.png` | `develop`: a contact can only be paid from Transparent. With 0 there, 0.02 shows "Insufficient balance" and Send is disabled. |
| `after-1-contact-sources.png` | Send → contact opens the From step. Transparent 0, Platform and Shielded funded. |
| `after-2-amount-platform.png` | Amount step paying from Platform. The From card leads back to the From step. |
| `after-3-confirm-platform.png` | The confirm sheet names the contact as the recipient. No address is reserved yet. |
| `after-4-submitted-platform.png` | 0.02 DASH Platform withdrawal submitted to the contact. |
| `after-5-confirm-shielded.png` / `after-6-submitted-shielded.png` | 0.05 DASH Shielded withdrawal confirmed, then submitted. |
| `after-7-sender-contact-history.png` | The sender's activity with the contact lists both withdrawals as "Withdrawal submitted". |
| `recipient-1-history.png` | The recipient shows both payments as "Received from Pasta-anybal-send-1006" (13:48 +0.02, 13:51 +0.05). Its balance went from 0.96999737 to 1.03999737. |
| `recipient-2-platform-receipt.png` / `recipient-3-shielded-receipt.png` | Receipt details for each payment: received from the sender's username, fee paid by the sender. |

## v2: contact payments read as "Sent" (head `d55954ab2`)

After review, Platform- and Shielded-funded contact payments no longer say "Withdrawal submitted":
- The success screen says **Sent**, plus when the contact receives it.
- The contact's activity lists them like any other sent payment. A note appears only when the outcome is unknown.
- The confirm sheet names the contact instead of describing a withdrawal.

Captured from a new real payment of 0.01 DASH from Platform on build `d55954ab2`:

| File | What it shows |
|---|---|
| `v2-1-confirm-platform.png` | The confirm sheet: "Pasta-anybal-recv-1006 receives it once the network processes the payment…" |
| `v2-2-sent-platform.png` | The success screen: **Sent**, 0.01 DASH, "…will receive it in a few minutes…" |
| `v2-3-sender-contact-history.png` | The sender's activity with the contact: −0.01, −0.05, −0.02, as plain sent rows. |
| `v2-4-recipient-history.png` | The recipient: Received from Pasta-anybal-send-1006 at 15:27 (+0.01), 13:51 (+0.05), 13:48 (+0.02). Balance 1.04999737. |
