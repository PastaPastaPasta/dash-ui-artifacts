# Restore refusal after removing and re-importing a wallet

The Dash Wallet fixture renderer was built independently from both revisions. Each run uses Chromium at 1280 × 820 with English copy and a synthetic regtest folder. The fixture supplies the startup response for an upgraded store whose schema history no longer matches. Rust integration tests use the committed v0.1.0 wallet stores to verify that the engine refuses to restore a retired snapshot and permits recovery into a fresh folder.

| State | Before · eebb848bd12b8a7e6fb56aef3b281a852fb880fc | After · 76556d2101d99db58512f7d0b8d44a328071fc9c |
| --- | --- | --- |
| Startup refusal, light | [Restore earlier data](before-light-refusal.png) | [Set up from recovery phrase](after-light-refusal.png) |
| Startup refusal, dark | [Restore earlier data](before-dark-refusal.png) | [Set up from recovery phrase](after-dark-refusal.png) |
| Confirmation, light | [Restart and restore](before-light-confirmation.png) | [Restart and set up](after-light-confirmation.png) |
| Confirmation, dark | [Restart and restore](before-dark-confirmation.png) | [Restart and set up](after-dark-confirmation.png) |

Each run verified that Cancel closes the confirmation without restarting the app.
