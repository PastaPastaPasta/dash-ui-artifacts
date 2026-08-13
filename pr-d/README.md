# PR D — provider transaction history

Native macOS `dash-qt` Computer Use evidence for Dash Core. D01–D06 were
captured at `00855f3a72dd`; the saved-filter compatibility evidence was captured
at `f9e750949310`. The D03 detail pair was rendered from the same deterministic
Update Registrar integration fixture under native Cocoa, using the generic
renderer at `1147adfe25c7` and the operation-summary renderer at
`f9e750949310`. All data is disposable regtest or integration-test data.

The complete, pre-frozen user-story manifest is in [`MANIFEST.md`](../MANIFEST.md#pr-d--provider-transaction-history).

| Story | Evidence |
|---|---|
| D01 wallet-funded regular/Evo | [table](D01/02-history-table.png), [regular row](D01/03-regular-registration-row.png), [details](D01/05-regular-registration-details.png), [Evo row](D01/06-evo-registration-row.png), [copied text](D01/copied-text.txt) |
| D02 exact/external collateral | [exact](D02/01-wallet-exact-registration.png), [external](D02/02-external-registration.png), [details](D02/03-exact-registration-details.png) |
| D03 maintenance types | [service](D03/01-update-service-row.png), [registrar](D03/02-update-registrar-row.png), [revoke](D03/03-revoke-row.png), [before: generic output rendering](D03/05-update-details.png), [after: operation summary](D03/06-registrar-summary-final.png) |
| D04 filters | [Masternode-only](D04/04-masternode-only.png) |
| D05 restart reconstruction | [before](D05/01-before-restart.png), [after](D05/02-after-restart.png) |
| D06 CoinJoin-disabled indexing | [visible non-CoinJoin filters](D06/01-coinjoin-disabled-filter.png) |
| D07 saved filter compatibility | [saved Data Transaction restored](D07/01-saved-data-filter-restored.png) |

Every retained image was reopened at original resolution and inspected for
values, classification, clipping, overlap, and personal data.
