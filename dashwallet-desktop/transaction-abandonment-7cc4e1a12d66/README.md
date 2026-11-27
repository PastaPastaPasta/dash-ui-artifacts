# Abandon and Remove unconfirmed transactions

Before images use merge base `eebb848bd12b8a7e6fb56aef3b281a852fb880fc`. After images use head `7cc4e1a12d668e41e4a73a843abd3dc8413beee5`. Each revision ran independently in the pinned Playwright `v1.64.0-noble` container with Chromium at 1280 × 820, en-US, in light and dark.

- Activity with spending wording opens the Abandon confirmation on the transaction ID consisting of 32 d0 bytes in the `abandon-debit-unknown` fixture.
- Activity with unresolved inputs opens Abandon for the pending 0.20 tDASH receipt at 1:40 AM in the `funded` fixture.
- Repair opens Tools → Repair → Remove unconfirmed transactions in the `funded` fixture.

The updated confirmations explain why coins from abandoned moves or consolidations of mixed coins stay reserved. They also remove the manual restart instruction.
