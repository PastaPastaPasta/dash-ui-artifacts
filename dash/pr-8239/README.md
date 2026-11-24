# dashpay/dash#8239 — macOS popup menu corners

- Before: exact PR base `83dc5ea9b27beb014c97d584181bc31faba32e97`
- After: PR head `9c6a676977cc869b0445a5bd06b95d7d340fe3ae`
- Platform: GitHub-hosted `macos-15` runner, macOS 15.8.2 (24H232), arm64, 1024x768 display; Homebrew Qt 5.15.19; `cmake -DBUILD_GUI=ON`, Release.
- Capture run: https://github.com/PastaPastaPasta/dash-ui-artifacts/actions/runs/45505554343 (workflow and script in `capture/`).
- Fixture: fresh regtest datadir per revision, descriptor wallet `w` importing a fixed key, 3 blocks mined to `yQGF4Bs6HD12TdN7Rba7dWjGwD1pZ4JGe1` under the same `-mocktime`. The theme is set via `defaults write org.dash.Dash-Qt-regtest theme`. Menus are opened by right-clicking with `cliclick` at fixed coordinates and captured with `screencapture -x` (full screen, no cursor).
- Menus: Transactions tab row context menu (`TransactionView`) and the Send tab Pay To `QLineEdit` Copy/Select All menu, in Light and Dark.
- `*-zoom3x.png`: the same pixels cropped and scaled 3x (nearest neighbour). `*-full.png`: the original screenshots.
- Unrelated difference: in the Light line-edit pair, Pay To shows the focus border in the base capture and the invalid-address border in the head capture (validation timing). The menu itself is unaffected.
