# Disconnect and App Connect

Before uses `a518432bd0121817ecd16b8c22264034f5a818ae`, the merge base. After uses `b94a3b0879363377a438c1566fa016da8dc1e031`, the candidate head. Both builds ran independently in Chromium at 1280 × 820 with light and dark themes.

The testnet fixture wallet uses the same Alice identity, Yappr app, and keys 6 and 7 in both builds. Scripted IPC returns reproduce the legacy record, partial batch, fee spike, disabled keys awaiting confirmation, and transient refresh error. The sign-in recording pauses briefly on the error and recovery states.

| Image name ends with | State |
| --- | --- |
| `legacy-confirmation.png` | The legacy connection quote before the wallet can verify the recorded keys, and afterward with Disconnect enabled. |
| `partial-batch.png` | One of two keys was disabled. The remaining key and Disconnect button are visible. |
| `pending-fee.png` | A higher fee prevents resending the earlier attempt. The new button checks its result without a fee. |
| `pending-list.png` | The earlier attempt remains reachable after Platform shows its keys disabled. |
| `sheet-refresh.png` | Platform failed during a sign-in sheet refresh. The newer build keeps Try again available and Approve disabled. |
| `legacy-completed.png` | The older connection was disconnected and removed from the list. |
| `sheet-recovered.png` | Retrying the refresh restores the quote and enables Approve. |
