# W3 360px header and "post sent": visual evidence

- **Before:** base `64b2fff8` (staging). **After:** head `9d83aec4`.
- **Setup:** both ran on `next dev` with `.env.staging` against live testnet staging. The viewport was exactly 360×780 at DPR 2.

| File | Shows |
|---|---|
| feed-360 | Home Latest, signed out. Before: 10 of 12 headers cut the display name ("Staging 4…") while the @handle still had room. After: 0 of 12. |
| after-post-on-top-360 | Persona 24 posted while the feed was on Top. Before: a 3s "Posted" toast. After: "Your post was sent" with a View link. |
| latest-after-switch-360 | Switched to Latest right after posting. Before: the new post was not first within 40s. After: it was first after 0.8s. |
