# yappr PR #827: brand (fox mark, yappr wordmark, Powered by Dash)

PR: https://github.com/PastaPastaPasta/yappr/pull/827

- **before**: `e5f32f0e`, the exact staging base of the PR head
- **after**: `f4fdaafb494ca6ae20c8f0cca441eb3a0e389e29`, the PR head

Each side was built with `BASE_PATH=/staging npm run build` from that revision and served locally. Playwright Chromium captured them at 2x: 1440x900 desktop, 390x844 narrow, and 1100px for the compact sidebar, with `prefers-color-scheme` set to light and to dark.

The pages read **live testnet staging data**, so post counts and feed contents can differ between the two captures. Only the brand elements differ because of the PR:
- the sidebar logo
- the hero wordmark
- the Powered by Dash credit
- the sign-in title
- the right-rail credit
- the compact sidebar mark

`comparison/icons.png` shows the committed icon PNGs, read with `git show` from the same two revisions:
- iOS: production, testnet, and dark
- Android: adaptive, testnet
- splash
- web: icon-192 and favicon
- link preview

The native app was not run on a device or simulator for this PR. The shared machine's load average was 150–300 and simulator calls hung.

| file | shows |
|---|---|
| comparison/web-landing-desktop-{light,dark}.png | the landing hero and sidebar |
| comparison/web-landing-narrow-{light,dark}.png | the landing page at 390px |
| comparison/web-feed-desktop-{light,dark}.png | the feed: sidebar lockup and right-rail credit |
| comparison/web-feed-compact-sidebar.png | the compact sidebar below the xl breakpoint |
| comparison/web-signin-desktop-{light,dark}.png | the sign-in dialog title |
| comparison/icons.png | the app icons, splash, favicon and link preview |
| before/, after/ | the full-resolution single captures |
