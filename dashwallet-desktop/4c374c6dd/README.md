# Shielded transfers and recovery

Before was captured from `95c5c5b4c6809bf5e68198f1bceced8aa1407d11`. After was captured from `4c374c6dd5fd748c23067b93ef3b49945c30ecd8`. The renderer used deterministic wallet fixtures in headless Chromium in Docker at 1280 × 820, scale 1 and locale en-US. The Activity comparisons supply the corresponding engine responses to each renderer revision.

## Several refused transfers

The fixture shows two remaining locks, totalling 0.50 DASH, with recovery disabled on mainnet.

| Theme | Before `95c5c5b4c` | After `4c374c6dd` |
| --- | --- | --- |
| Light | ![Several refused transfers, light, before 95c5c5b4c](before/light-several-transfers.png) | ![Several refused transfers, light, after 4c374c6dd](after/light-several-transfers.png) |
| Dark | ![Several refused transfers, dark, before 95c5c5b4c](before/dark-several-transfers.png) | ![Several refused transfers, dark, after 4c374c6dd](after/dark-several-transfers.png) |

## The remainder drops below the fee after quoting

The fixture changes the remainder to one credit between the quote and confirmation.

| Theme | Before `95c5c5b4c` | After `4c374c6dd` |
| --- | --- | --- |
| Light | ![The remainder drops below the fee after quoting, light, before 95c5c5b4c](before/light-below-fee-race.png) | ![The remainder drops below the fee after quoting, light, after 4c374c6dd](after/light-below-fee-race.png) |
| Dark | ![The remainder drops below the fee after quoting, dark, before 95c5c5b4c](before/dark-below-fee-race.png) | ![The remainder drops below the fee after quoting, dark, after 4c374c6dd](after/dark-below-fee-race.png) |

## The quote finds the transfer already recovered

A fixture quote returns `finished` and clears the only lock.

| Theme | Before `95c5c5b4c` | After `4c374c6dd` |
| --- | --- | --- |
| Light | ![The quote finds the transfer already recovered, light, before 95c5c5b4c](before/light-finished-quote.png) | ![The quote finds the transfer already recovered, light, after 4c374c6dd](after/light-finished-quote.png) |
| Dark | ![The quote finds the transfer already recovered, dark, before 95c5c5b4c](before/dark-finished-quote.png) | ![The quote finds the transfer already recovered, dark, after 4c374c6dd](after/dark-finished-quote.png) |

## Held refusal after restarting

The fixture supplies the history row that the dispatch journal now reconstructs.

| Theme | Before `95c5c5b4c` | After `4c374c6dd` |
| --- | --- | --- |
| Light | ![Held refusal after restarting, light, before 95c5c5b4c](before/light-held-after-restart.png) | ![Held refusal after restarting, light, after 4c374c6dd](after/light-held-after-restart.png) |
| Dark | ![Held refusal after restarting, dark, before 95c5c5b4c](before/dark-held-after-restart.png) | ![Held refusal after restarting, dark, after 4c374c6dd](after/dark-held-after-restart.png) |

## Refusal after proof releases the hold

The fixture supplies the reconstructed row with the released outcome.

| Theme | Before `95c5c5b4c` | After `4c374c6dd` |
| --- | --- | --- |
| Light | ![Refusal after proof releases the hold, light, before 95c5c5b4c](before/light-released-after-restart.png) | ![Refusal after proof releases the hold, light, after 4c374c6dd](after/light-released-after-restart.png) |
| Dark | ![Refusal after proof releases the hold, dark, before 95c5c5b4c](before/dark-released-after-restart.png) | ![Refusal after proof releases the hold, dark, after 4c374c6dd](after/dark-released-after-restart.png) |

## Shielded sync held before its first successful pass

The fixture returns a held status before the account has synced.

| Theme | Before `95c5c5b4c` | After `4c374c6dd` |
| --- | --- | --- |
| Light | ![Shielded sync held before its first successful pass, light, before 95c5c5b4c](before/light-sync-held.png) | ![Shielded sync held before its first successful pass, light, after 4c374c6dd](after/light-sync-held.png) |
| Dark | ![Shielded sync held before its first successful pass, dark, before 95c5c5b4c](before/dark-sync-held.png) | ![Shielded sync held before its first successful pass, dark, after 4c374c6dd](after/dark-sync-held.png) |

