# Shielded transfers and recovery

Before was captured from `45a240409ddad0a93aab82285bd4324876e4c8c8`. After was captured from `cfa66f8bf2de769ba5f526fdee23671eab01d244`. The renderer used deterministic wallet fixtures in headless Chromium in Docker at 1280 × 820, scale 1 and locale en-US. The Activity and held withdrawal comparisons supply the corresponding engine responses to each renderer revision.

## Several refused transfers

The fixture shows two remaining locks, totalling 0.50 DASH, with recovery disabled on mainnet.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Several refused transfers, light, before 45a240409](before/light-several-transfers.png) | ![Several refused transfers, light, after cfa66f8bf](after/light-several-transfers.png) |
| Dark | ![Several refused transfers, dark, before 45a240409](before/dark-several-transfers.png) | ![Several refused transfers, dark, after cfa66f8bf](after/dark-several-transfers.png) |

## The remainder drops below the fee after quoting

The fixture changes the remainder to one credit between the quote and confirmation.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![The remainder drops below the fee after quoting, light, before 45a240409](before/light-below-fee-race.png) | ![The remainder drops below the fee after quoting, light, after cfa66f8bf](after/light-below-fee-race.png) |
| Dark | ![The remainder drops below the fee after quoting, dark, before 45a240409](before/dark-below-fee-race.png) | ![The remainder drops below the fee after quoting, dark, after cfa66f8bf](after/dark-below-fee-race.png) |

## The quote finds the transfer already recovered

A fixture quote returns `finished` and clears the only lock.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![The quote finds the transfer already recovered, light, before 45a240409](before/light-finished-quote.png) | ![The quote finds the transfer already recovered, light, after cfa66f8bf](after/light-finished-quote.png) |
| Dark | ![The quote finds the transfer already recovered, dark, before 45a240409](before/dark-finished-quote.png) | ![The quote finds the transfer already recovered, dark, after cfa66f8bf](after/dark-finished-quote.png) |

## Held refusal after restarting

The fixture supplies the history row that the dispatch journal now reconstructs.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Held refusal after restarting, light, before 45a240409](before/light-held-after-restart.png) | ![Held refusal after restarting, light, after cfa66f8bf](after/light-held-after-restart.png) |
| Dark | ![Held refusal after restarting, dark, before 45a240409](before/dark-held-after-restart.png) | ![Held refusal after restarting, dark, after cfa66f8bf](after/dark-held-after-restart.png) |

## Refusal after proof releases the hold

The fixture supplies the reconstructed row with the released outcome.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Refusal after proof releases the hold, light, before 45a240409](before/light-released-after-restart.png) | ![Refusal after proof releases the hold, light, after cfa66f8bf](after/light-released-after-restart.png) |
| Dark | ![Refusal after proof releases the hold, dark, before 45a240409](before/dark-released-after-restart.png) | ![Refusal after proof releases the hold, dark, after cfa66f8bf](after/dark-released-after-restart.png) |

## Shielded sync held before its first successful pass

The fixture returns a held status before the account has synced.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Shielded sync held before its first successful pass, light, before 45a240409](before/light-sync-held.png) | ![Shielded sync held before its first successful pass, light, after cfa66f8bf](after/light-sync-held.png) |
| Dark | ![Shielded sync held before its first successful pass, dark, before 45a240409](before/dark-sync-held.png) | ![Shielded sync held before its first successful pass, dark, after cfa66f8bf](after/dark-sync-held.png) |

## Shielded to Dash wallet at the pool floor, notes held

The fixture supplies the pending response on the base and the pool-floor refusal on the head, with the quoted debit held in both.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Shielded to Dash wallet at the pool floor, notes held, light, before 45a240409](before/light-pool-floor-shieldedToCore.png) | ![Shielded to Dash wallet at the pool floor, notes held, light, after cfa66f8bf](after/light-pool-floor-shieldedToCore.png) |
| Dark | ![Shielded to Dash wallet at the pool floor, notes held, dark, before 45a240409](before/dark-pool-floor-shieldedToCore.png) | ![Shielded to Dash wallet at the pool floor, notes held, dark, after cfa66f8bf](after/dark-pool-floor-shieldedToCore.png) |

## Shielded to Platform at the pool floor, notes held

The fixture supplies the pending response on the base and the pool-floor refusal on the head, with the quoted debit held in both.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Shielded to Platform at the pool floor, notes held, light, before 45a240409](before/light-pool-floor-shieldedToPlatform.png) | ![Shielded to Platform at the pool floor, notes held, light, after cfa66f8bf](after/light-pool-floor-shieldedToPlatform.png) |
| Dark | ![Shielded to Platform at the pool floor, notes held, dark, before 45a240409](before/dark-pool-floor-shieldedToPlatform.png) | ![Shielded to Platform at the pool floor, notes held, dark, after cfa66f8bf](after/dark-pool-floor-shieldedToPlatform.png) |

## Pool-floor refusal with the notes free

The same pool-floor error displays the updated copy when there is no note hold.

| Theme | Before `45a240409` | After `cfa66f8bf` |
| --- | --- | --- |
| Light | ![Pool-floor refusal with the notes free, light, before 45a240409](before/light-pool-floor-unheld.png) | ![Pool-floor refusal with the notes free, light, after cfa66f8bf](after/light-pool-floor-unheld.png) |
| Dark | ![Pool-floor refusal with the notes free, dark, before 45a240409](before/dark-pool-floor-unheld.png) | ![Pool-floor refusal with the notes free, dark, after cfa66f8bf](after/dark-pool-floor-unheld.png) |
