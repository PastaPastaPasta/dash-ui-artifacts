# Seller payment explorer network (QA69 / PR #474)

A seller opening a real devnet payment from an order is sent to the testnet explorer, which cannot find the transaction. The fix selects the explorer from the actual payment scheme and deployment network. Mainnet Dash stays on mainnet; tdash uses testnet or the configured devnet; other schemes retain the transaction ID without a misleading Dash link.

## Exact revision comparison

- Before: `c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0`, independently built and served on port 3260.
- After: full reviewed head `081a50993a7e72480fbd81e9e5cd020d7fd147b6`, independently built and served on port 3296.
- Same Chromium viewport, 1440×1100; fresh contexts using the same dedicated QA seller; same immutable order and real payment; unmodified screenshots inspected at original resolution.
- Paid order: `2T8ThBeiKHy7ajPLe1bzjGgyN9RudXZXhaQ1byNZS7uZ`.
- Payment transaction: `4408369deb53d9888a3f269efb8294b56b0b989891485d05b0278f9e1a7c050a`, paying 1,000 duffs to the dedicated QA merchant.

Each side decrypts that same order, then clicks its transaction link. No order, payment, inventory, or store setting was written during capture. Confirmation counts are live and may increase.

| Before — exact base | After — full PR head |
| --- | --- |
| ![Before seller payment link](before/seller-link.png) | ![After seller payment link](after/seller-link.png) |
| ![Before wrong network has no transaction](before/explorer.png) | ![After correct network shows confirmed transaction](after/explorer.png) |

The baseline transaction request returns 404. The final head opens Moutai and its transaction request returns 200; the page shows the actual payment. The working Moutai entry point uses the root hashbang route because direct deep links return 404. The external explorer redirects its HTTPS root to its existing HTTP frontend; this PR does not change that hosting behavior.

## Review correction and validation

The reviewer identified a runtime boundary: decrypted JSON is asserted as an order payload, so a missing or non-string payment URI can reach the helper even though normal checkout supplies a string. The final helper returns null for those values before parsing the scheme, preserving the existing plain-text transaction fallback.

Six decoded JSON cases (missing, null, number, boolean, object, and array) failed against prior PR head `79e44e6b626f7595d47fe6f42a78fa87c6817447`; all 15 focused tests pass on the final head. Full TypeScript checking, lint, final devnet build, and independent review pass. This runtime guard is covered by local tests, not a manufactured live order or a claimed visual difference. No malformed order was persisted. Broader order-payload validation, including the pre-existing expanded-row rendering of object-valued fields, remains outside this narrow change.

These screenshots supersede the prior head comparison at artifact `da200d332945fa4598138bdec97cb8bafb92333a`; the earlier images covered head `79e44e6b` and are no longer the final-head evidence. [Evidence matrix](matrix.md) and per-side result JSON record provenance and actual explorer requests.

[Related actual payment and buyer/seller readback report](https://github.com/PastaPastaPasta/dash-ui-artifacts/tree/da200d332945fa4598138bdec97cb8bafb92333a/yappr/qa-20260915-revalidation/commerce-payment51). Original settlement testing required a disclosed local integration of PR #432 because clean staging cannot calculate DASH→tdash amounts (QA25). That integration is not part of this PR or its exact base/head comparison. External wallet GUI and QR interoperability remain unverified. Rounded 0.0000 DASH values in the seller screen are the separate QA21 issue.
