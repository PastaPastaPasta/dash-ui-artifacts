| Surface | Before | After | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Guest /followers/ desktop + mobile | staging 4105c5d1c914f5d0838619da93c3b8d28b4a780e | 980ab21326c76ae3649980f3510d3d9116b22428 | Fresh signed-out Chromium context, no query id; same live devnet configuration | Fictional @User and zero count replaced by sign-in context and working recovery actions |
| Guest /following/ desktop + mobile | same exact base | same exact head | same fixture | Fictional @User and zero count replaced by sign-in context and working recovery actions |

Authenticated own-list and explicit-id guest browsing are compatibility guarantees covered by browser assertions, with no claimed visual difference. Desktop global trending/stats may change during live network seeding; the connection pane is the compared surface. Viewport capture only, to avoid capturing the closed mobile More sheet outside the actual viewport.
