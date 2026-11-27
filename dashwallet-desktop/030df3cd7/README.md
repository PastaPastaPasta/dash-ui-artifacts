# Shielded transfers and recovery

Before was captured from `eebb848bd12b8a7e6fb56aef3b281a852fb880fc`. After was captured from `030df3cd727bd7b15bb17f58e78c0d333be621ae`. The renderer used deterministic wallet fixtures in headless Chromium in Docker at 1280 × 820, scale 1 and locale en-US. The Activity and held withdrawal comparisons supply the corresponding engine responses to each renderer revision.

## Several refused transfers

The fixture shows two remaining locks, totalling 0.50 DASH, with recovery disabled on mainnet.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Several refused transfers, light, before eebb848bd](before/light-several-transfers.png) | ![Several refused transfers, light, after 030df3cd7](after/light-several-transfers.png) |
| Dark | ![Several refused transfers, dark, before eebb848bd](before/dark-several-transfers.png) | ![Several refused transfers, dark, after 030df3cd7](after/dark-several-transfers.png) |

## The remainder drops below the fee after quoting

The fixture changes the remainder to one credit between the quote and confirmation.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![The remainder drops below the fee after quoting, light, before eebb848bd](before/light-below-fee-race.png) | ![The remainder drops below the fee after quoting, light, after 030df3cd7](after/light-below-fee-race.png) |
| Dark | ![The remainder drops below the fee after quoting, dark, before eebb848bd](before/dark-below-fee-race.png) | ![The remainder drops below the fee after quoting, dark, after 030df3cd7](after/dark-below-fee-race.png) |

## The quote finds the transfer already recovered

A fixture quote returns `finished` and clears the only lock.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![The quote finds the transfer already recovered, light, before eebb848bd](before/light-finished-quote.png) | ![The quote finds the transfer already recovered, light, after 030df3cd7](after/light-finished-quote.png) |
| Dark | ![The quote finds the transfer already recovered, dark, before eebb848bd](before/dark-finished-quote.png) | ![The quote finds the transfer already recovered, dark, after 030df3cd7](after/dark-finished-quote.png) |

## Held refusal after restarting

The fixture supplies the history row that the dispatch journal now reconstructs.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Held refusal after restarting, light, before eebb848bd](before/light-held-after-restart.png) | ![Held refusal after restarting, light, after 030df3cd7](after/light-held-after-restart.png) |
| Dark | ![Held refusal after restarting, dark, before eebb848bd](before/dark-held-after-restart.png) | ![Held refusal after restarting, dark, after 030df3cd7](after/dark-held-after-restart.png) |

## Refusal after proof releases the hold

The fixture supplies the reconstructed row with the released outcome.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Refusal after proof releases the hold, light, before eebb848bd](before/light-released-after-restart.png) | ![Refusal after proof releases the hold, light, after 030df3cd7](after/light-released-after-restart.png) |
| Dark | ![Refusal after proof releases the hold, dark, before eebb848bd](before/dark-released-after-restart.png) | ![Refusal after proof releases the hold, dark, after 030df3cd7](after/dark-released-after-restart.png) |

## Shielded sync held before its first successful pass

The fixture returns a held status before the account has synced.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Shielded sync held before its first successful pass, light, before eebb848bd](before/light-sync-held.png) | ![Shielded sync held before its first successful pass, light, after 030df3cd7](after/light-sync-held.png) |
| Dark | ![Shielded sync held before its first successful pass, dark, before eebb848bd](before/dark-sync-held.png) | ![Shielded sync held before its first successful pass, dark, after 030df3cd7](after/dark-sync-held.png) |

## Shielded to Dash wallet at the pool floor, notes held

The fixture supplies the pending response on the base and the pool-floor refusal on the head, with the quoted debit held in both.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Shielded to Dash wallet at the pool floor, notes held, light, before eebb848bd](before/light-pool-floor-shieldedToCore.png) | ![Shielded to Dash wallet at the pool floor, notes held, light, after 030df3cd7](after/light-pool-floor-shieldedToCore.png) |
| Dark | ![Shielded to Dash wallet at the pool floor, notes held, dark, before eebb848bd](before/dark-pool-floor-shieldedToCore.png) | ![Shielded to Dash wallet at the pool floor, notes held, dark, after 030df3cd7](after/dark-pool-floor-shieldedToCore.png) |

## Shielded to Platform at the pool floor, notes held

The fixture supplies the pending response on the base and the pool-floor refusal on the head, with the quoted debit held in both.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Shielded to Platform at the pool floor, notes held, light, before eebb848bd](before/light-pool-floor-shieldedToPlatform.png) | ![Shielded to Platform at the pool floor, notes held, light, after 030df3cd7](after/light-pool-floor-shieldedToPlatform.png) |
| Dark | ![Shielded to Platform at the pool floor, notes held, dark, before eebb848bd](before/dark-pool-floor-shieldedToPlatform.png) | ![Shielded to Platform at the pool floor, notes held, dark, after 030df3cd7](after/dark-pool-floor-shieldedToPlatform.png) |

## Pool-floor refusal with the notes free

The same pool-floor error displays the updated copy when there is no note hold.

| Theme | Before `eebb848bd` | After `030df3cd7` |
| --- | --- | --- |
| Light | ![Pool-floor refusal with the notes free, light, before eebb848bd](before/light-pool-floor-unheld.png) | ![Pool-floor refusal with the notes free, light, after 030df3cd7](after/light-pool-floor-unheld.png) |
| Dark | ![Pool-floor refusal with the notes free, dark, before eebb848bd](before/dark-pool-floor-unheld.png) | ![Pool-floor refusal with the notes free, dark, after 030df3cd7](after/dark-pool-floor-unheld.png) |
