# Disconnect and App Connect

Before captures came from `8a7ee3d5fb627406337caf82fe7d4514035833f8` on main. After captures and the recording came from `b39de178c88eab160f200a9ff9bd5a4df516c447`. Both builds ran independently in Chromium at 1280 × 820, using the same fixture wallet, Alice identity, Yappr app, and keys 6 and 7. Scripted IPC responses reproduced the Platform states.

| State | What the images show |
| --- | --- |
| Legacy confirmation | The older connection receives a usable Disconnect quote after its recorded keys can be verified. |
| Legacy completed | The verified legacy keys are disabled and the connection leaves the list. |
| Partial batch | The first batch disables one key and reports that a second verified key remains. |
| Pending fee | Opening a sheet after the fee spike offers a no-fee check of the earlier attempt. |
| Open sheet fee | A fee spike during an open confirmation refreshes that sheet to “Check earlier attempt”. |
| Pending list | A pending Disconnect stays reachable even after Platform shows its keys disabled. |
| Unresolved key | A recorded key remains unresolved, so the banner says Disconnect is pending. |
| Sheet refresh | A temporary sign-in refresh error keeps Try again available and Approve disabled. |
| Sheet recovered | Retrying restores the quote and enables Approve. The light-theme recording shows the interaction. |
