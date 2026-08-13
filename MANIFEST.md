# Dash masternode GUI extraction — verification manifest

This manifest is frozen before any pull request is opened. Each UI-bearing PR
is gated on every applicable story below passing through the native `dash-qt`
interface under Computer Use and every distinct screen/state being captured,
opened at original resolution, and visually inspected. Backend-only PRs A and
P have no screens; their complete behavior manifests are exercised by automated
tests instead of fabricating screenshots.

All keys, addresses, transactions, and balances are throwaway regtest data.
Screenshots are stored as `<pr>/<story>/<nn>-<state>.png`; each completed row
will record the tested commit, observed outcome, image paths, and SHA-256 hashes.

## PR A — recoverable wallet-derived BLS operator keys

UI surface: none.

| ID | User story / expected behavior | Verification |
|---|---|---|
| A01 | DashSync-compatible `m/9'/coin'/3'/3'/index` derivation matches known vectors. | Automated |
| A02 | Mainnet uses coin type 5; testnet/regtest/devnet use coin type 1. | Automated |
| A03 | Indexes 0, 1, and 2 produce distinct basic-scheme keys and paths. | Automated |
| A04 | Legacy and descriptor mnemonic wallets derive the same compatible key material. | Automated |
| A05 | An encrypted wallet refuses derivation while locked and succeeds after unlock. | Automated |
| A06 | Mnemonic-only restoration recovers a registered key without an index DB record; lookup is exact and does not mutate the wallet. | Automated |
| A07 | Derivation skips keys already registered on chain or reserved by an in-flight registration. | Automated |
| A08 | Cancelling or failing registration releases a reservation and does not consume one of the bounded indexes. | Automated |
| A09 | Successful registration explicitly commits its reserved index and survives reload. | Automated |
| A10 | Watch-only, external-signer, blank, raw-seed-without-mnemonic, and no-seed wallets do not claim mnemonic recovery support. | Automated |
| A11 | Corrupt or mismatched index records never return an unrelated secret. | Automated |
| A12 | Exhausting the bounded recovery range returns an explicit error. | Automated |
| A13 | Both basic- and legacy-scheme registered public-key encodings can be matched during recovery. | Automated |

Screenshot set: intentionally empty because the PR has no Qt entry point or screen.

Verification record: PASS at implementation commit `671a104d2c7d` (PR head
`819e95ca0f4e`, release note only). The 10-case `masternode_operator_tests`
suite, focused wallet regression suites, full depends-backed build, targeted
linters, architecture/reliability review, security review, and simplification
review passed. PR: https://github.com/dashpay/dash/pull/7594

## PR P — typed provider-transaction foundation

UI surface: none.

| ID | User story / expected behavior | Verification |
|---|---|---|
| P01 | Fund and broadcast a regular registration through the typed service and unchanged RPC adapter. | Automated |
| P02 | Fund and broadcast an Evo registration, pre-v24 and post-v24. | Automated |
| P03 | Register with an exact wallet-owned collateral outpoint. | Automated |
| P04 | Prepare an external-collateral registration and submit its decoded compact signature. | Automated |
| P05 | `submit=false` returns a fully signed transaction without broadcast, preserving RPC compatibility. | Automated |
| P06 | Update Service for regular and Evo nodes, including v24 endpoint lists. | Automated |
| P07 | Update Registrar while preserving omitted fields. | Automated |
| P08 | Revoke with each reason value 0–3. | Automated |
| P09 | Wallet-locked, invalid collateral/address/key, missing MN, wrong MN type, insufficient funds, incomplete signing, consensus rejection, and broadcast failure return typed errors. | Automated |
| P10 | RPC wrappers preserve public result shapes and error-code behavior while sharing the same implementation; incompletely signed inputs are intentionally rejected as a wallet error instead of returning or broadcasting a partial transaction. | Automated |
| P11 | No-wallet builds compile and the API never exposes `UniValue`, `JSONRPCRequest`, method strings, or wallet URI routing. | Build/static audit |
| P12 | Lock ordering never holds wallet and validation locks together; synchronous calls are safe to run from a worker. | Review/TSAN-oriented test |

Screenshot set: intentionally empty because the PR has no Qt entry point or screen.

## PR B — regular and Evo registration wizard

### End-to-end journeys

| ID | User journey | Required screens and states |
|---|---|---|
| B01 | Regular, wallet-funded 1,000 DASH collateral, derived BLS key. | Masternode-list launch; Type; Fund Collateral; Service; derived-pending Keys; zero-reward Payout; Fee; Review top/bottom; unlock; Registering busy; derived Result top/bottom; confirmed list row. |
| B02 | Evo, wallet-funded 4,000 DASH collateral, derived key, v24 active. | Evo Type; multiple Core services; Keys; nonzero-reward warning; Platform endpoint lists; Fee; complete Evo Review; busy; Evo Result/next steps; confirmed row. |
| B03 | Regular, exact confirmed wallet UTXO, generated show-once key. | Existing-collateral selector; generated-key card; fee-only source; Review; busy; secret Result; wrong-last-four; correct-last-four; enabled Finish. |
| B04 | Evo, exact wallet UTXO, externally held operator public key, pre-v24. | Existing output; required Core service; existing-key card; Platform node ID and ports; Review; busy; result without secret card. |
| B05 | Regular, external/hardware collateral. | External txid/vout; Review warning; Preparing busy; sign-message page; invalid signature; valid signature; Submitting busy; Result. |
| B06 | Evo, external collateral, v24 active. | External 4,000-DASH outpoint; Platform lists; Review; prepare/sign/submit; Evo Result. |

### Entry, capability, and lifecycle stories

| ID | User story / expected behavior |
|---|---|
| B07 | No wallet disables Register with a precise tooltip. |
| B08 | Watch-only and external-signer-only wallets cannot start an unsupported funded flow. |
| B09 | A wallet without a recovery phrase omits derivation and describes generated/external options accurately. |
| B10 | The Type page switches between regular and Evo and rebuilds the required page order. |
| B11 | Minimum 700×560 layout remains usable; Review/Result scroll; representative light and dark themes have no clipping. |
| B12 | Back edits data and rebuilds Review without submitting or consuming a derived-key index. |
| B13 | Cancel, Escape, Back, and window close are ignored while a typed operation is in flight. |
| B14 | A typed backend rejection returns to an editable state with an actionable modal/message. |
| B15 | Closing a prepared external registration warns and releases only the collateral lock acquired by this session. |
| B16 | Closing a generated-secret result without confirmation warns; derived/external results close normally. |
| B17 | Capability activation is rechecked at submission so a page opened across v24 activation cannot submit stale semantics. |

### Collateral and funding stories

| ID | User story / expected behavior |
|---|---|
| B18 | Fund mode accepts a valid new P2PKH address and shows insufficient collateral-plus-fee balance accurately. |
| B19 | Exact-output mode lists only confirmed, spendable, unlocked P2PKH outputs of exactly 1,000 or 4,000 DASH for the selected type. |
| B20 | Exact-output empty state explains the required denomination and confirmation. |
| B21 | External mode rejects an invalid txid and accepts a valid txid:vout. |
| B22 | Fee picker aggregates actual spendable balance per address and excludes watch-only/non-spendable coins. |
| B23 | Fee-only mode shows a precise empty state when no eligible source can pay fees. |

### Service, key, payout, and Platform validation stories

| ID | User story / expected behavior |
|---|---|
| B24 | Regular registration accepts an empty Core service for an initially inactive MN. |
| B25 | Pre-v24 Evo rejects an empty Core service. |
| B26 | Post-v24 Evo can leave all service fields empty for a later Update Service. |
| B27 | Invalid or duplicate Core `IP:port` entries are rejected; normalized multiple endpoints are accepted. |
| B28 | New owner/voting addresses and delegated voting work; “same as owner” is represented accurately. |
| B29 | Invalid owner, owner equal to funded collateral, invalid delegated voting, and non-P2PKH voting are rejected. |
| B30 | Derived mode unlock-cancel leaves the wizard stable; retry derives provisionally and only rebuilds Review. |
| B31 | Generated mode exposes a fresh basic-scheme key only in the wizard; Existing mode validates the public key without possessing a secret. |
| B32 | Invalid external BLS public key is rejected. |
| B33 | Payout accepts P2PKH/P2SH; invalid payout and payout equal to funded collateral are rejected. |
| B34 | Operator reward 0 has no warning; nonzero reward shows operator-payout implications. |
| B35 | Invalid Platform node ID is rejected. |
| B36 | Pre-v24 Evo validates bare Platform P2P/HTTPS ports. |
| B37 | Post-v24 Evo validates and deduplicates Platform P2P/HTTPS `IP:port` lists. |
| B38 | Populating only one Platform address family is rejected. |
| B39 | Core populated with empty Platform lists post-v24 is rejected. |
| B40 | Invalid base64 collateral signature is rejected without losing the prepared transaction. |

Distinct validation messages B18–B40 each require a captured error state. A pairwise
set may cover independent choices; the six backend-distinct journeys must all run end to end.

## PR C — regular and Evo maintenance

| ID | User journey | Required screens and states |
|---|---|---|
| C01 | Regular pre-v24 Update Service. | Eligible context menu; current singular service prefilled; edit; busy; success txid; refreshed row/details. |
| C02 | Regular post-v24 Update Service with multiple Core endpoints. | Complete replace-all list prefilled; invalid/duplicate errors; successful replacement without loss. |
| C03 | Evo pre-v24 Update Service. | Current Core service, Platform node ID, P2P/HTTPS ports; successful update. |
| C04 | Evo post-v24 Update Service. | Full Core/P2P/HTTPS lists and Platform node ID prefilled; successful replace-all update without silent field loss. |
| C05 | PoSe-banned MN service update. | Before state; update; after state proving revival. |
| C06 | Wallet owns a derived operator key. | “Use wallet key” default; unlock if needed; successful signing without copy/paste exposure. |
| C07 | Externally operated MN. | Manual-secret fallback; wrong-key inline error; successful retry. |
| C08 | Registrar voting-only update. | Other values explicitly preserved; busy/success; voting row refresh. |
| C09 | Registrar payout-only update. | Other values preserved; payout row refresh. |
| C10 | Registrar operator rotation. | Rotation/PoSe warning; banned post-update row; follow-up service update with new key revives it. |
| C11 | Registrar combined update. | All changed values refresh in the already-open list/details. |
| C12 | Owner key absent. | Registrar action disabled with precise tooltip. |
| C13 | Revoke. | Expanded menu and each reason 0–3 selected; cancel path; busy; success; cleared service/banned state; unchanged collateral. |
| C14 | Locked, unlock-cancel, watch-only, and no-wallet states. | Accurate prompts, disabled actions, and explanations. |
| C15 | Operator reward 0 vs nonzero. | Operator payout field absent vs present. |
| C16 | Automatic vs explicit fee funding. | Explicit Automatic/default row and a spendable address both work. |
| C17 | Operation in flight and failure. | Close/Cancel/Escape ignored; typed error leaves dialog editable; success closes only after acknowledgement. |
| C18 | Show Operator Key for a recorded derived key. | Context action; unlock; public key, secret, derivation path, `dash.conf` line, and Copy controls. |
| C19 | Show Operator Key from mnemonic-only restoration. | Bounded recovery succeeds without mutating the wallet merely because the key was viewed. |
| C20 | Show Operator Key for unrelated, wrong-seed, raw-seed, watch-only, or external key. | No false ownership; disabled/precise not-recoverable state. |
| C21 | Show Operator Key for a legacy-scheme registration. | Correct secret/config and path. |
| C22 | Two derived MN rows. | Distinct secrets and `/0`, `/1` paths. |

Context menus must be captured with owner+operator available, owner absent,
operator not recoverable, and watch-only. Distinct dialog layouts (regular/Evo,
pre/post-v24, reward 0/nonzero), success, and meaningful failures all require images.

Validation screenshots: no registrar changes; invalid operator public key; P2SH
voting rejection; invalid payout; invalid/duplicate service; incomplete Platform
pair; insufficient fee balance; wrong operator key. Revoke screenshots include the
expanded reason menu and all four selected labels; automated tests prove mapping 0–3.

## PR D — provider transaction history

| ID | User story / expected behavior | Required screens |
|---|---|---|
| D01 | Wallet-funded regular and Evo ProRegTx rows say “Masternode Registration,” not “Payment to yourself,” and show net fee semantics. | History overview; registration tooltip; details; copied-text result. |
| D02 | Wallet-owned exact collateral and external collateral ProRegTx classify once without duplicate/misleading rows. | History overview/details for both. |
| D03 | Update Service, Update Registrar, and Revoke rows say “Masternode Update.” | History overview; update tooltip; details. |
| D04 | Registration/update appear in the default common filter and the Masternode filter shows only those records. | Expanded filter; masternode-only view. |
| D05 | Historical wallet transactions reclassify after restart, not only upon live notification. | Before/after restart history. |
| D06 | Adding the filter does not break CoinJoin filter visibility/indexing when CoinJoin display is disabled. | CoinJoin-disabled expanded filter. |
| D07 | A transaction type filter saved by an earlier release keeps the same meaning after upgrade; adding Masternode does not reinterpret the saved Data Transaction, Dust Receive, or Other index. | Restored Data Transaction selection from saved index 12; Masternode remains available as the appended filter. |

Verification record: the authoritative comparison was captured from the exact PR
base `981a25d0a3c385cd4fe037a8a68f814ca6c4a815` and full PR head
`f9e7509493103cc977dcc9e9044c9a4d86e9eaff`. Both native macOS `dash-qt` builds
used matching copies of the same disposable regtest wallet and chain. The
registration and Update Registrar pairs were filtered by the same exact
transaction IDs on both builds. The previous intermediate-commit detail
comparison is superseded; the D03 detail filenames and `comparison/` tree now
contain exact-base/exact-head captures. Every comparison PNG was reopened at
original resolution and inspected; no clipping, overlap, personal data, or
non-regtest secrets were found.

| ID | Observed outcome | Evidence |
|---|---|---|
| D01 | Wallet-funded regular and Evo transactions each render one `Masternode Registration` row with `(n/a)` address, the wallet's net fee, explicit details type, and accurate copied plain text. | `D01/02-history-table.png` (`7dfb2686…`), `D01/03-regular-registration-row.png` (`69064929…`), `D01/05-regular-registration-details.png` (`bb936793…`), `D01/06-evo-registration-row.png` (`099270ef…`), `D01/copied-text.txt` |
| D02 | Exact wallet-owned and external-collateral registrations each classify once; neither decomposes into a misleading provider output row. | `D02/01-wallet-exact-registration.png` (`ec3e5c2d…`), `D02/02-external-registration.png` (`930ad4a1…`), `D02/03-exact-registration-details.png` (`af987526…`) |
| D03 | Update Service, Update Registrar, and Revoke each render one `Masternode Update` row with net-fee semantics. For the same exact Update Registrar transaction, base shows generic debit/credit/fee and output-index fields; the PR shows the operation type, net wallet effect, transaction ID, and size without the misleading output decomposition. | `D03/01-update-service-row.png` (`8ad4d220…`), `D03/02-update-registrar-row.png` (`14e28d52…`), `D03/03-revoke-row.png` (`e7b4aced…`), `D03/05-update-details.png` (`48d5c978…`), `D03/06-registrar-summary-final.png` (`21024afa…`) |
| D04 | All seven provider records appear in the default common view, while `Masternode` selects exactly four registrations and three updates. | `D01/02-history-table.png`, `D04/04-masternode-only.png` (`15a96bfa…`) |
| D05 | The same seven records and classifications survive full GUI termination and wallet-model reconstruction. | `D05/01-before-restart.png` (`8831948b…`), `D05/02-after-restart.png` (`d16d4c8a…`) |
| D06 | Disabling CoinJoin changes the current type to `Most Common` and removes all five CoinJoin choices by stored value; `Masternode` and later filters remain correctly ordered and selectable. | `D06/01-coinjoin-disabled-filter.png` (`5dd4fc04…`); Computer Use accessibility tree recorded the visible choices `All`, `Most Common`, `Received with`, `Sent to`, `To yourself`, `Mined`, `Platform Transfer`, `Data Transaction`, `Dust Receive`, `Other`, `Masternode`. |
| D07 | A pre-existing saved index 12 restored `Data Transaction` on first view without user reselection; `Masternode` remained available at the trailing index. Automated coverage also proves indices 13 and 14 still select `Dust Receive` and `Other`. | `D07/01-saved-data-filter-restored.png` (`6909c8f0…`) |

Automated verification also covers tooltip text and HTML/plain-text details,
restart and queued-live paths, exactly one row per provider transaction,
externally funded credit semantics, CoinJoin-enabled/disabled visibility by
value, and non-provider special-transaction regression behavior.

The complete exact-base/exact-head set is indexed in
[`pr-d/README.md`](pr-d/README.md) and includes the history overview,
registration row/details, update row/tooltip/details, expanded type filter,
Masternode-only result, and copied update text.

## Visual inspection checklist

Every captured screen is inspected at original resolution for:

- correct values, copy text, action enablement, and visible validation;
- no clipping, overlap, truncation of critical values, or unusable scroll area;
- stable minimum-window behavior and representative light/dark theming;
- accurate destructive/irreversible warnings and busy-state controls;
- absence of non-regtest secrets or personal data.
