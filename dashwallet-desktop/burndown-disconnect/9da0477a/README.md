# Disconnect and App Connect

Before captures came from `45a240409ddad0a93aab82285bd4324876e4c8c8` on main. After captures and the recording came from `9da0477a6998bd3a43bd24eb15f4ec5d04ebf0e0`. Both builds ran independently in Chromium at 1280 × 820, using the same fixture wallet, Alice identity, Yappr app, and keys 6 and 7. Scripted IPC responses reproduced the Platform states.

| State | What the images show |
| --- | --- |
| Legacy confirmation | The older connection can proceed once the user confirms each quoted key. |
| Legacy authorized | Confirming both key IDs enables Disconnect and leaves the fee visible. |
| Legacy completed | The selected legacy keys were disabled and the connection leaves the list. |
| Partial batch | The first batch disables one key and reports that a second verified key remains. |
| Pending fee | Opening a sheet after the fee spike offers a no-fee check of the earlier attempt. |
| Open sheet fee | A fee spike during an open confirmation refreshes that sheet to “Check earlier attempt”. |
| Pending list | A pending Disconnect stays reachable even after Platform shows its keys disabled. |
| Unresolved key | A recorded key remains unresolved, so the banner says Disconnect is pending. |
| Sheet refresh | A temporary sign-in refresh error keeps Try again available and Approve disabled. |
| Sheet recovered | Retrying restores the quote and enables Approve. The light-theme recording shows the interaction. |
| Legacy renewal | The base shows an approvable sign-in quote. The updated renderer shows the refusal and directs the user through Connected apps before a new sign-in. The engine regression verifies both paths against an old Published record. |
