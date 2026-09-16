# QA86 composer dismissal comparison

Before exact staging base: `cf0efbc10b8757137063113ebbd2061e8b87d8f7`.
After full signed PR head: `a57de1332b390823942a317af1e6f491f5aaa41a`.

| Transition | Shared fixture | Before visible state | After expected visible state |
|---|---|---|---|
| Reply→Escape→sidebar Post | Persona55, public post9mcdDNznWP86bScjmMykF1kzNpecneoFoZVVNAB5qCFd | Empty draft still replying to old author | New public post, no reply context |
| Quote→backdrop→sidebar Post | Same | Empty draft still quotes old post | No quoted post |
| Poll→Escape→sidebar Post | Same | Old poll choices survive without question | Empty normal composer, no poll |
| Preview→backdrop→sidebar Post | Same | Nothing to preview, Edit mode button | Editable textarea, Preview button |
| Reply→storage-provider Settings→sidebar Post | Same, no provider configured | Still replying after navigation | Empty normal composer |

The explicit Close button is the existing consistent-reset reference. Also verify provider Cancel retains the parent draft, NSFW resets to the actual profile default, reopened drafts contain no old text, and normal reply/quote/poll controls still open. No posts or polls are submitted. Image upload success is not exercised without a provider fixture.

Fresh isolated scoped sessions seeded from controlled QA corpus (not login evidence); actual network services and data. Chromium1280×900/light theme. Independent committed devnet builds at3288 and3292. Wait for existing author/profile/follower data, without injecting DOM or response content. Capture unaltered final PNGs, inspect all originals, publish immutable artifact links and verify public bytes/type/hash and rendered comparison.
