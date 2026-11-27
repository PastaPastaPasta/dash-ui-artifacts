# Restore refusal after an interrupted wallet removal

The Dash Wallet fixture renderer was built independently from both revisions. Each run uses the pinned Playwright Docker image and Chromium at 1280 × 820 with English copy and a synthetic regtest folder. The fixture supplies the startup response for an upgraded store whose schema history no longer matches, after wallet removal stopped at the retirement step. Rust integration tests use the committed v0.1.0 wallet stores to verify that the engine refuses to restore a retired snapshot and permits recovery into a fresh folder.

| State | Before · eebb848bd12b8a7e6fb56aef3b281a852fb880fc | After · 491d0bd925cb006d82e95263d1e3af14d8317e26 |
| --- | --- | --- |
| Startup refusal, light | [Restore earlier data](before-light-refusal.png) | [Set up from recovery phrase](after-light-refusal.png) |
| Startup refusal, dark | [Restore earlier data](before-dark-refusal.png) | [Set up from recovery phrase](after-dark-refusal.png) |
| Confirmation, light | [Restart and restore](before-light-confirmation.png) | [Restart and set up](after-light-confirmation.png) |
| Confirmation, dark | [Restart and restore](before-dark-confirmation.png) | [Restart and set up](after-dark-confirmation.png) |

The updated refusal names the retirement and explains that payment holds and in-progress work stay in the original folder. Each run verified that Cancel closes the confirmation without restarting the app.
