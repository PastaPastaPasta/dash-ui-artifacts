# Store repair and recovery

Before revision `a518432bd0121817ecd16b8c22264034f5a818ae`

After revision `bdea96cc5e9a7ed5ca2aa21b8aa2d148fd46ffe7`

Linux Docker, headless Chromium, 1280 × 820, fixture wallets and simulated backend outcomes. WebKit ran the same after scenarios.

| State | Before | After |
|---|---|---|
| Corrupt wallet at startup, light | [Before](before/light-corrupt-wallet.png) | [After](after/light-corrupt-wallet.png) |
| Corrupt wallet at startup, dark | [Before](before/dark-corrupt-wallet.png) | [After](after/dark-corrupt-wallet.png) |
| Missing Shielded store, light | [Before](before/light-missing-shielded.png) | [After](after/light-missing-shielded.png) |
| Missing Shielded store, dark | [Before](before/dark-missing-shielded.png) | [After](after/dark-missing-shielded.png) |
| Unreadable legacy claim, light | [Before](before/light-unreadable-legacy.png) | [After](after/light-unreadable-legacy.png) |
| Unreadable legacy claim, dark | [Before](before/dark-unreadable-legacy.png) | [After](after/dark-unreadable-legacy.png) |
| Switch to damaged Testnet, light | [Before](before/light-damaged-switch.png) | [After](after/light-damaged-switch.png) |
| Switch to damaged Testnet, dark | [Before](before/dark-damaged-switch.png) | [After](after/dark-damaged-switch.png) |

After confirmation and restart on Testnet

- [Recovery confirmation, light](after/light-damaged-switch-confirm.png)
- [Recovery confirmation, dark](after/dark-damaged-switch-confirm.png)
- [Recovery-phrase setup, light](after/light-damaged-switch-recovery.png)
- [Recovery-phrase setup, dark](after/dark-damaged-switch-recovery.png)
