# Radar PR #36: identity transition filters

- Source: PastaPastaPasta/radar PR #36, head `2d84b6de93e1f7b0ddfce360b7d4480f72519aa4` (production build, `GITHUB_SHA` stamped).
- Served by `review/serve.mjs` (the real edge Worker in Miniflare) against live mainnet data, 2026-11-28.
- Page: `/identity/2SM7bNMQBgH6ncWoxxxgPTM6Bir3wBsymnTSxrRfk2CY?tab=transactions&txcontract=Bwr4WHCPz5rFVAD87RqTs3izo4zpzwsEdKPWUT1NS1C7` (hilawe.dash filtered to DashPay; 24 matching transitions).
- `*-list.png`: the filtered list. `*-picker.png`: the contract picker open (contracts from the identity's own transitions, with counts and document types).
- Viewports: desktop 1280×860, phone 390×844 @2x (touch). Light and dark via `prefers-color-scheme`. No horizontal overflow in any.

## live/ (production)

- https://explorer.dashhq.org, Worker `radar-web` version `e0aa908f-53a3-4b04-a9eb-383b25b940e1`, build of main `4321d1ed70cbadde2ac787f119b8869c03187474` (the squash merge of PR #36), captured 2026-11-28.
- Same URL, viewports and themes as above. 24 rows, no horizontal overflow in any.
