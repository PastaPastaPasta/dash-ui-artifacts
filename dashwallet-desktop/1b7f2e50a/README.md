# Shielded transfers and recovery

Before was captured from `fca6fa6b12f5e38b7c84b8d9e422972a213467cd`. After was captured from `1b7f2e50a2dc36a0372ba310587d47a529f63500`. The renderer used deterministic wallet fixtures in headless Chromium in Docker at 1280 × 820, scale 1 and locale en-US. The Activity comparisons supply the corresponding engine responses to each renderer revision.

## Several refused transfers

The fixture shows two remaining locks, totalling 0.50 DASH, with recovery disabled on mainnet.

| Theme | Before `fca6fa6b1` | After `1b7f2e50a` |
| --- | --- | --- |
| Light | ![Several refused transfers, light, before fca6fa6b1](before/light-several-transfers.png) | ![Several refused transfers, light, after 1b7f2e50a](after/light-several-transfers.png) |
| Dark | ![Several refused transfers, dark, before fca6fa6b1](before/dark-several-transfers.png) | ![Several refused transfers, dark, after 1b7f2e50a](after/dark-several-transfers.png) |

## The remainder drops below the fee after quoting

The fixture changes the remainder to one credit between the quote and confirmation.

| Theme | Before `fca6fa6b1` | After `1b7f2e50a` |
| --- | --- | --- |
| Light | ![The remainder drops below the fee after quoting, light, before fca6fa6b1](before/light-below-fee-race.png) | ![The remainder drops below the fee after quoting, light, after 1b7f2e50a](after/light-below-fee-race.png) |
| Dark | ![The remainder drops below the fee after quoting, dark, before fca6fa6b1](before/dark-below-fee-race.png) | ![The remainder drops below the fee after quoting, dark, after 1b7f2e50a](after/dark-below-fee-race.png) |

## The quote finds the transfer already recovered

A fixture quote returns `finished` and clears the only lock.

| Theme | Before `fca6fa6b1` | After `1b7f2e50a` |
| --- | --- | --- |
| Light | ![The quote finds the transfer already recovered, light, before fca6fa6b1](before/light-finished-quote.png) | ![The quote finds the transfer already recovered, light, after 1b7f2e50a](after/light-finished-quote.png) |
| Dark | ![The quote finds the transfer already recovered, dark, before fca6fa6b1](before/dark-finished-quote.png) | ![The quote finds the transfer already recovered, dark, after 1b7f2e50a](after/dark-finished-quote.png) |

## Held refusal after restarting

The fixture supplies the history row that the dispatch journal now reconstructs.

| Theme | Before `fca6fa6b1` | After `1b7f2e50a` |
| --- | --- | --- |
| Light | ![Held refusal after restarting, light, before fca6fa6b1](before/light-held-after-restart.png) | ![Held refusal after restarting, light, after 1b7f2e50a](after/light-held-after-restart.png) |
| Dark | ![Held refusal after restarting, dark, before fca6fa6b1](before/dark-held-after-restart.png) | ![Held refusal after restarting, dark, after 1b7f2e50a](after/dark-held-after-restart.png) |

## Refusal after proof releases the hold

The fixture supplies the reconstructed row with the released outcome.

| Theme | Before `fca6fa6b1` | After `1b7f2e50a` |
| --- | --- | --- |
| Light | ![Refusal after proof releases the hold, light, before fca6fa6b1](before/light-released-after-restart.png) | ![Refusal after proof releases the hold, light, after 1b7f2e50a](after/light-released-after-restart.png) |
| Dark | ![Refusal after proof releases the hold, dark, before fca6fa6b1](before/dark-released-after-restart.png) | ![Refusal after proof releases the hold, dark, after 1b7f2e50a](after/dark-released-after-restart.png) |

## Shielded sync held before its first successful pass

The fixture returns a held status before the account has synced.

| Theme | Before `fca6fa6b1` | After `1b7f2e50a` |
| --- | --- | --- |
| Light | ![Shielded sync held before its first successful pass, light, before fca6fa6b1](before/light-sync-held.png) | ![Shielded sync held before its first successful pass, light, after 1b7f2e50a](after/light-sync-held.png) |
| Dark | ![Shielded sync held before its first successful pass, dark, before fca6fa6b1](before/dark-sync-held.png) | ![Shielded sync held before its first successful pass, dark, after 1b7f2e50a](after/dark-sync-held.png) |

