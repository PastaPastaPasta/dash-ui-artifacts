| Behavior | Before exact base | After committed head | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Click post Share and open actual copied URL | 4105c5d1c914f5d0838619da93c3b8d28b4a780e, independently built /devnet | Focused fix/post-share-base-path commit, independently built /devnet | Public poll post Aey3uVJBpk7hEUi48zxRfZMavt3pQNeTdsUXkp4zppCd, guest, 1280x1000, UTC, en-US | Source page stays same; clipboard URL gains /devnet and opening it displays the same post instead of local404 |

Independent fresh browser contexts. Ports differ because before/head servers run separately. Devnet network state may change while these captures run; post ID and content are fixed. No handcrafted pages or DOM changes. Clipboard text and HTTP status are recorded by browser. Local static-server404 demonstrates wrong deployment path; production may instead route to the site's root/testnet app.
