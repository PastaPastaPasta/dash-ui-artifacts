# dash-sites showcase: system theme and mainnet copy

- Repository: PastaPastaPasta/dash-sites, `packages/showcase`
- After: branch `feat/showcase-mainnet` at `797d7c6957ec07a2328d06afe0f7b6ec118b3e43` (`node packages/showcase/build.mjs` output)
- Before: `origin/main` at `a11217b8ff397aa463c729f78322f75d96ccc990` (`packages/showcase/site`, captured with a light system preference to show it ignored it)
- Captured with Playwright 1.65.1 / Chromium, full-page, `reducedMotion: reduce`, desktop 1280x800 and phone 390x844, `colorScheme` light and dark, served from 127.0.0.1.

Fixture: there is no Platform behind a local server, so `/.well-known/dash/` was answered by a stub.
`site.json` is p2p.dash's real testnet record fetched from p2p.id.dashhq.org (block 738998) with
`name` changed to `built4.dash`, `network` to `mainnet` and `servedBy` to `browser` (what dash.site
reports); `manifest.json` is p2p.dash's real manifest unchanged; `resolve/*` answers `unregistered`.
The publish page has `alice` typed into the name checker.
`norecord/` is the same build with `/.well-known/dash/` returning 404, to show the not-read state.

`after/<page>-<light|dark>-<desktop|phone>.png`, `before/<page>-base-light-<size>.png`,
`norecord/<page>-<light|dark>-<size>.png`. Hashes in SHA256SUMS.
