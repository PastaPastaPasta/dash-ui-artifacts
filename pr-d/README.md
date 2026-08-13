# PR D — provider transaction history

Authoritative native macOS `dash-qt` before/after evidence for Dash Core PR
[#7595](https://github.com/dashpay/dash/pull/7595).

- **Before:** exact PR base `981a25d0a3c385cd4fe037a8a68f814ca6c4a815`
- **After:** full PR head `f9e7509493103cc977dcc9e9044c9a4d86e9eaff`
- **Fixture:** matching copies of the same disposable regtest wallet and chain
- **Registration txid:** `8f630584bd5227fe7398178a4c93d36156dd84d5851ded4ca3a116a762cb2b79`
- **Update Registrar txid:** `76084b4b03d97f4da17085b0a3cb928eeb6baadd04651844da8de658ba9c8519`

The comparison is deliberately base-to-head. It does not use an intermediate PR
commit as the before state.

| Surface | Before | After |
|---|---|---|
| Complete history | [base](comparison/before/01-history-overview.png) | [PR](comparison/after/01-history-overview.png) |
| Registration row, same txid | [base](comparison/before/02-registration-records.png) | [PR](comparison/after/02-registration-records.png) |
| Registration details, same txid | [base](comparison/before/03-registration-details.png) | [PR](comparison/after/03-registration-details.png) |
| Update row, same txid | [base](comparison/before/04-update-records.png) | [PR](comparison/after/04-update-records.png) |
| Update tooltip, same txid | [base](comparison/before/05-update-tooltip.png) | [PR](comparison/after/05-update-tooltip.png) |
| Update details, same txid | [base](comparison/before/06-update-details.png) | [PR](comparison/after/06-update-details.png) |
| Expanded type filter | [base](comparison/before/07-type-filter-expanded.png) | [PR](comparison/after/07-type-filter-expanded.png) |
| Masternode-only result | Not available | [PR: exactly seven provider operations](comparison/after/08-masternode-only.png) |
| Copied update text | [base](comparison/before/update-copied-text.txt) | [PR](comparison/after/update-copied-text.txt) |

The screenshots show these user-visible changes:

- provider transactions stop looking like ordinary `Payment to yourself` rows;
- registrations and maintenance operations become one operation-level record with
  `(n/a)` for the non-applicable address and the wallet's net balance change;
- details gain the operation type and drop generic payment decomposition, including
  the meaningless per-record output index;
- tooltips and copied text describe the masternode operation;
- the type menu gains `Masternode`, which selects exactly four registrations and
  three updates in this fixture.

The existing `D01`–`D07` directories remain as supplemental story-specific PR-head
QA. The old D03 detail filenames now contain the exact-base and exact-head detail
captures above so previously shared links no longer point to the invalid
intermediate-commit comparison.

Every comparison image was reopened at original resolution and checked for the
expected transaction ID, values, classification, clipping, overlap, and personal
data. All data is disposable regtest data.
