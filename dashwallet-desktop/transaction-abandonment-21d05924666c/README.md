# Abandon, Repair, and Resend a mixed-coin move

Before images use merge base `fca6fa6b12f5e38b7c84b8d9e422972a213467cd`. After images use head `21d05924666c6d2b4608489449f871c5d81f450b`. Each revision ran independently in the pinned Playwright `v1.64.0-noble` container with Chromium at 1280 × 820, en-US, in light and dark.

- Activity with spending wording opens the Abandon confirmation on the transaction ID consisting of 32 d0 bytes in the `abandon-debit-unknown` fixture.
- Activity with unresolved inputs opens Abandon for the pending 0.20 tDASH receipt at 1:40 AM in the `funded` fixture.
- Repair opens Tools → Repair → Remove unconfirmed transactions in the `funded` fixture.
- For Activity Resend, the fixture supplies an abandoned mixed-coin move with a transaction ID of 32 d1 bytes. Both before images show the abandoned transaction's details. The after images show its Resend action and the confirmation.

The screenshots use only fixture data.
