# Yappr PR485: retain the encryption key accepted by private-feed setup

Source PR: https://github.com/PastaPastaPasta/yappr/pull/485

Before — exact PR483 parent: `e65d33681a6c289fa0255bde0d8dfd0366193664`.
After — full signed PR485 head: `b5b72b15421cdb8df1e4ed600f0dfa4e2e8a8a9f`.

This refreshed comparison supersedes the earlier staging-base evidence in artifact `d688c8a93f19d285a31057c719d0bfed2f953196`. PR485 is now stacked on PR483. Both revisions were independently built with `npm run build:devnet`, served at localhost3297 and localhost3299 respectively, and verified through the compiled About hash.

## Live first-enable comparison

**Distinct synthetic devnet owners are necessary because private-feed creation is immutable.** Before uses persona78 `streetbianca8`, identity `9LQjbxV6BiArha9QiiLAp1ziN2i497SR1giWvxZD4b2R`; after uses persona79 `fatima-writes4`, identity `mxntRqug49iiEeka2RDRnQrf8hJZBkkQe971Am68wnJ`. Both use registered encryption key4, normal password sign-in, an unlocked password vault, and their first Enable operation. Both resulting feeds are at epoch1 with zero followers. No feed reset/delete was used. Owner handles, avatars, identities and existing public post counts naturally differ.

Before — feed creation succeeds but the accepted key is missing and the user is prompted to enter it again:

![Before feed enabled but key missing](comparison/before/focus.png)

After — the same flow retains the key immediately and removes the redundant key-entry prompt:

![After feed enabled and key stored](comparison/after/focus.png)

[Before full desktop](comparison/before/desktop.png) · [After full desktop](comparison/after/desktop.png)

Fresh-browser compatibility check: normal password sign-in still lacks the key before, while the head restores it from the auth vault:

[Before fresh password sign-in](comparison/before/fresh-password.png) · [After fresh password sign-in](comparison/after/fresh-password.png)

The live browser checks confirm no stored encryption key before Enable; successful actual feed creation; missing/stored key status before/after; consistent status after reload; and the corresponding status after password sign-in in a fresh browser. No private post or follower was created. The synthetic feeds/password vaults remain available to the ongoing audit. [Before assertions](before-results.json) · [After assertions](after-results.json) · [Read-only fixture preflight](persona78-79-preflight.json) · [Evidence matrix](matrix.md).

Shared capture setup: devnet moutai, checked-in `.env.devnet`, Chromium1440×1200, device scale1, light theme, en-US, America/Chicago, same route and top scroll position. The full images are unmodified viewport captures. Focused images capture the same settings card at native resolution; its height decreases after the redundant key-entry button is removed. No resizing or annotation. All six final PNGs were opened and inspected at original resolution. Secret fields were empty or absent; no credentials or browser auth state are published. The live comparison uses ordinary password login without restored session snapshots, DOM replacement, injected product state, or mocked responses.

## Isolated browser regression coverage

The head adds [three component browser regressions](https://github.com/PastaPastaPasta/yappr/blob/b5b72b15421cdb8df1e4ed600f0dfa4e2e8a8a9f/e2e/components/private-feed-enable.spec.ts), run by `npm run test:components` and the dedicated Browser Component Tests CI job. These tests are explicitly synthetic and separate from the live captures above. They render the real `PrivateFeedSettings`, real toast UI, `lib/secure-storage.ts`, platform-auth browser secret store, WIF normalization and localStorage. Chain/auth-vault boundaries, identity validation and unrelated dialogs are mocked; external requests are blocked. The fixture uses public scalar1, never a live credential.

- Successful enable persists canonical WIF locally before vault merge and refreshes enabled status.
- A targeted localStorage key-write failure is swallowed by the real browser secret store; null readback yields the storage warning, skips vault merge and still refreshes enabled status.
- A rejected vault merge yields the backup warning, retains the local key and still refreshes enabled status.

Every case asserts the success toast and absence of “Failed to enable private feed” after successful chain creation. All three pass on the fix. With a temporary copy of the exact parent `e65d33681a6c289fa0255bde0d8dfd0366193664` component, all three fail on the expected missing persistence behavior; the temporary copy/alias was removed and the tests passed again. These are functional tests of failure handling, not live Platform fault injection or visual proof of those failure cases.

Validation passed: application lint, explicit harness lint, application/component/live-E2E TypeScript checks, Knip, three component browser tests, existing reset unit tests, production devnet build, independent actual-diff source review and a simplification review. An unavailable/locked vault follows the existing merge helper behavior; recovery through password login was tested with unlocked password vaults.

The separate stale sibling-panel issue QA82 is visible immediately after Enable on both revisions: requests/follower panels still ask to enable the feed. It is outside PR485; those panels refresh after reload. The changed lower-page appearance after a fresh login is not attributed to this key-persistence fix.

## Publication verification

Six final PNGs were inspected at original resolution. All 11 published files are fetched and checked for HTTP status, content type, byte size and SHA256, and the rendered PR and README are checked after publication. Hashes below cover the ten non-README files; the external verification record also hashes this README.

- `6263d99aa677479a2aaaddabf267f570b802dd4ab10286d0e5301b60ba4374b5` — `after-results.json`
- `802ab5a14e9ceb42040e3d8e536f4962ce8b960eb38ee9bb3d55c0c8fd11ca90` — `before-results.json`
- `4285447ea8f9c4ecc00f5ad20b79213248abf4da470fbe93652faa91ac261e4b` — `comparison/after/desktop.png`
- `c12b757c280d546ae641862efddf05ab8627a96beff96a93fb86c7bd91b14358` — `comparison/after/focus.png`
- `608b5dd5c5fdfab686f9ce18ca2df1f32ab339cc732ac9015e2839d7ed9a4b05` — `comparison/after/fresh-password.png`
- `74bde294ebb17026f18bde536a8af5fc7f84e3cff600561efe76c6985db1feb1` — `comparison/before/desktop.png`
- `6e588d27818aa41823180565d57406e178b115a3affbec7468b912313804bead` — `comparison/before/focus.png`
- `2f95c868ae2006ada43eda709c83c1e294d96611040c3c5a0374407e1d469f50` — `comparison/before/fresh-password.png`
- `d594854a188b055d08a9006456372eea368830513f5e8cc678ae9df3386c274a` — `matrix.md`
- `fd57dfe4c2adb0ad3cba3235246b49c72a1f30a00d6b82f4273ff5b095cc3292` — `persona78-79-preflight.json`
