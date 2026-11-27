# Abandon, Repair, and Resend a mixed-coin move

Before images use merge base `53196f35f4aa5d999ab35719d6c6f1463cc96f94`. After images use head `d2197d627be634204ffe20f449c09ad7c285a0e3`. Each revision ran independently in the pinned Playwright `v1.64.0-noble` container with Chromium at 1280 × 820, en-US, in light and dark.

- Activity with spending wording opens the Abandon confirmation on the transaction ID consisting of 32 d0 bytes in the `abandon-debit-unknown` fixture.
- Activity with unresolved inputs opens Abandon for the pending 0.20 tDASH receipt at 1:40 AM in the `funded` fixture.
- Repair opens Tools → Repair → Remove unconfirmed transactions in the `funded` fixture.
- For Activity Resend, the fixture supplies an abandoned mixed-coin move with a transaction ID of 32 d1 bytes. Both before images show the abandoned transaction's details. The after images show its Resend action and the confirmation.

The screenshots use only fixture data.
