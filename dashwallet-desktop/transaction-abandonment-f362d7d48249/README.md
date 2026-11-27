# Abandon and Remove unconfirmed transactions

Before images use merge base `53196f35f4aa5d999ab35719d6c6f1463cc96f94`. After images use head `f362d7d482497d6cbea4d51553899e7584a1ad22`. Each revision ran independently in the pinned Playwright `v1.64.0-noble` container with Chromium at 1280 × 820, en-US, in light and dark.

- Activity with spending wording opens the Abandon confirmation on the transaction ID consisting of 32 d0 bytes in the `abandon-debit-unknown` fixture.
- Activity with unresolved inputs opens Abandon for the pending 0.20 tDASH receipt at 1:40 AM in the `funded` fixture.
- Repair opens Tools → Repair → Remove unconfirmed transactions in the `funded` fixture.

The updated confirmations explain why coins from abandoned moves or consolidations of mixed coins stay reserved. They also remove the manual restart instruction.
