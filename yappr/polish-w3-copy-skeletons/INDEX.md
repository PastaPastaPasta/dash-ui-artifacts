# W3 copy and skeletons follow-up: visual evidence

- Before: base `01c40582` (staging). After: head `4477c773`.
- Both were served with `next dev` and `.env.staging` against live testnet staging, signed out, at 1280×900 and 390×844 with DPR 2.
- Loading states were held on screen by delaying every network read 5–6 s in the browser. Nothing else was changed.

| File | Shows |
|---|---|
| reply-prompt-* | A signed-out post page. Before: purple "Log in to reply". After: "Sign in to reply" in brand blue. |
| explore-top-loading-* | Explore → Top while loading. Before: a spinner and "Loading top posts...". After: post-card skeletons. |
| explore-top-loaded-* | The same view once posts arrive. |
| tag-loading-* | /hashtag?tag=coffee while loading. Before: a spinner. After: post-card skeletons. |

The starter-YAPP dialog copy change is shown in the PR diff only. No test persona is currently eligible to see that dialog.
