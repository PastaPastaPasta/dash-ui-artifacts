# Shielded transfers and recovery

Before was captured from `eb3f3ba67bde12edf3cc08120b329eb77b504a4d`. After was captured from `ac0035ffa7b1692b525aec07d17f5bc7d31fcd0b`. The renderer used deterministic wallet fixtures in headless Chromium in Docker at 1280 × 820, scale 1 and locale en-US. The Activity comparisons supply the corresponding engine responses to each renderer revision.

## Several refused transfers

The fixture shows two remaining locks, totalling 0.50 DASH, with recovery disabled on mainnet.

| Theme | Before `eb3f3ba67` | After `ac0035ffa` |
| --- | --- | --- |
| Light | ![Several refused transfers, light, before eb3f3ba67](before/light-several-transfers.png) | ![Several refused transfers, light, after ac0035ffa](after/light-several-transfers.png) |
| Dark | ![Several refused transfers, dark, before eb3f3ba67](before/dark-several-transfers.png) | ![Several refused transfers, dark, after ac0035ffa](after/dark-several-transfers.png) |

## The remainder drops below the fee after quoting

The fixture changes the remainder to one credit between the quote and confirmation.

| Theme | Before `eb3f3ba67` | After `ac0035ffa` |
| --- | --- | --- |
| Light | ![The remainder drops below the fee after quoting, light, before eb3f3ba67](before/light-below-fee-race.png) | ![The remainder drops below the fee after quoting, light, after ac0035ffa](after/light-below-fee-race.png) |
| Dark | ![The remainder drops below the fee after quoting, dark, before eb3f3ba67](before/dark-below-fee-race.png) | ![The remainder drops below the fee after quoting, dark, after ac0035ffa](after/dark-below-fee-race.png) |

## The quote finds the transfer already recovered

A fixture quote returns `finished` and clears the only lock.

| Theme | Before `eb3f3ba67` | After `ac0035ffa` |
| --- | --- | --- |
| Light | ![The quote finds the transfer already recovered, light, before eb3f3ba67](before/light-finished-quote.png) | ![The quote finds the transfer already recovered, light, after ac0035ffa](after/light-finished-quote.png) |
| Dark | ![The quote finds the transfer already recovered, dark, before eb3f3ba67](before/dark-finished-quote.png) | ![The quote finds the transfer already recovered, dark, after ac0035ffa](after/dark-finished-quote.png) |

## Held refusal after restarting

The fixture supplies the history row that the dispatch journal now reconstructs.

| Theme | Before `eb3f3ba67` | After `ac0035ffa` |
| --- | --- | --- |
| Light | ![Held refusal after restarting, light, before eb3f3ba67](before/light-held-after-restart.png) | ![Held refusal after restarting, light, after ac0035ffa](after/light-held-after-restart.png) |
| Dark | ![Held refusal after restarting, dark, before eb3f3ba67](before/dark-held-after-restart.png) | ![Held refusal after restarting, dark, after ac0035ffa](after/dark-held-after-restart.png) |

## Refusal after proof releases the hold

The fixture supplies the reconstructed row with the released outcome.

| Theme | Before `eb3f3ba67` | After `ac0035ffa` |
| --- | --- | --- |
| Light | ![Refusal after proof releases the hold, light, before eb3f3ba67](before/light-released-after-restart.png) | ![Refusal after proof releases the hold, light, after ac0035ffa](after/light-released-after-restart.png) |
| Dark | ![Refusal after proof releases the hold, dark, before eb3f3ba67](before/dark-released-after-restart.png) | ![Refusal after proof releases the hold, dark, after ac0035ffa](after/dark-released-after-restart.png) |

## Shielded sync held before its first successful pass

The fixture returns a held status before the account has synced.

| Theme | Before `eb3f3ba67` | After `ac0035ffa` |
| --- | --- | --- |
| Light | ![Shielded sync held before its first successful pass, light, before eb3f3ba67](before/light-sync-held.png) | ![Shielded sync held before its first successful pass, light, after ac0035ffa](after/light-sync-held.png) |
| Dark | ![Shielded sync held before its first successful pass, dark, before eb3f3ba67](before/dark-sync-held.png) | ![Shielded sync held before its first successful pass, dark, after ac0035ffa](after/dark-sync-held.png) |

