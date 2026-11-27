# dashpay/dash#8266 — Payments Left column

- Before: exact base `da48f84b09` (develop), `dash-qt` built from that commit.
- After: PR head `bb980a6e0a`, `dash-qt` built from that commit.
- Shared fixture: one regtest datadir (`-budgetparams=10:10:10`, superblock cycle 20, tip 451, next superblock 460) with four proposals whose windows were built the way the Create Proposal wizard builds them:
  - `core-dev-q1`: 1 payment starting at superblock 460
  - `marketing-campaign`: 3 payments starting at 460
  - `infra-hosting-2027`: 12 payments starting at 460
  - `community-events-later`: 6 payments starting at 540
- Both binaries opened the same datadir; no blocks were mined between captures.

| File | Shows |
| --- | --- |
| `comparison/before/governance-tab.png` | Governance tab on develop: no remaining-payments information |
| `comparison/after/governance-tab.png` | New "Payments Left" column: 1 / 3 / 12 / 6 |
| `comparison/after/proposal-details.png` | "Payments Left: 3" line in the proposal details. "Payments Requested: 4" there is pre-existing and regtest-only (regtest's 150 s target spacing vs the 157.2 s estimator); mainnet/testnet use 157.5 s and give 3. |
