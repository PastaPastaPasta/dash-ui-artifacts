# Yappr PR #414 — accessible post options menu

[Product PR](https://github.com/PastaPastaPasta/yappr/pull/414)

Current comparison after rebasing: exact staging base `c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0`; full PR head `493604551a19d37eb6e7972239f699ff768a7158`. These replace the previous4105c5d1/1d5daf5b captures for the current PR. Both revisions independently built with `npm run build:devnet` and served from separate worktrees at ports3260/3264. About output verifies the compiled revision. No copied markup, capture-only UI, DOM replacement, or API mock.

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before unnamed focused ellipsis](comparison/before/options-focus.png) | ![After named Post options tooltip](comparison/after/options-focus.png) |

Focused images are identical rectangle crops `(275,40,680,215)` of the full desktop screenshots, without resizing or annotation.

| Before — mobile | After — mobile |
| --- | --- |
| ![Before mobile](comparison/before/post-mobile.png) | ![After mobile](comparison/after/post-mobile.png) |

[Full desktop before](comparison/before/post-desktop.png) · [Full desktop after](comparison/after/post-desktop.png).

## Shared fixture and checks

Route `/devnet/post/?id=8Pu2yqcvPTnhtikJ2cWRnC2eukzLFHSJkrVEimGUjf47`. Same public seeded post by Bianca Ahmadi, identity `9LQjbxV6BiArha9QiiLAp1ziN2i497SR1giWvxZD4b2R`. Both captures wait for the resolved profile. Same viewer persona8 `ike-park7`, identity `H4P7NB1JNJ3B9LRpPixi3sUs7qhN5w9xs9YbQSBFh8Z1`, signed in through the normal UI with its registered QA key. Credentials remain private and absent from images. Separate fresh Chromium contexts, dark theme, en-US, America/Chicago, desktop1280×900 and mobile390×844, scale1.

All six final images were opened and inspected at original resolution. The tooltip is legible above the sticky header on both viewports. The post, profile, timestamp5h, counts, theme, and focus match across the pair.

[Post assertions](assertions.json) separately establish the nonvisual name change: before is an unnamed button, after is `button "Post options"`. Both exact revisions pass Enter opening, expanded=true, Escape dismissing, expanded=false, and focus restoration. Merged action labels and the Repost or quote tooltip were verified on both. [Reply assertions](reply-assertions.json) exercise existing real reply `Fm49xnhGoKheyBWKPn2KuzgeMwwuVDPgd61MRznovZg4`, with after named Reply options and the same keyboard behavior. No menu action or Platform write submitted by this comparison.

Targeted component lint, E2E TypeScript checks, production devnet build, and independent source review passed. Rebase preserved both signed commits; range-diff first commit differs only in test context after retained merged #413 labels, second patch identical. Permanent post lifecycle and topology assertions remain in the product. Full write suite was not rerun locally for this rebase; the described browser checks ran on both exact exports.

## SHA-256

- `2b3c2ea3c0730854ff255b3670c602b06547c5e44f424ad445151ab4eeebcf26` — `EVIDENCE_MATRIX.md`
- `006483b1fcf9760abf9811cd08bbeafce0bf1750dd3ab478eba43544d8dc35ad` — `assertions.json`
- `183f6145283e30f4d22e65b8485aafc33f7ab7f91c4dcc18c3fd177e370d4462` — `comparison/after/options-focus.png`
- `8338fe72820051cf08d91335fedcc14fd146e142fa4dfbe6ec7bbf124bb772c0` — `comparison/after/post-desktop.png`
- `43ef08d126b8e84fb3c7854799e9382bce265c0598b89fb97cb83c9888bfb412` — `comparison/after/post-mobile.png`
- `5f997e3b2e096885d489a29078dc78d04766d8dba7d476f0d332c5480891b341` — `comparison/before/options-focus.png`
- `6b30ed72d64f722fd0735b495182ed994e73d0da69232b9d7f0b701f42ba0b02` — `comparison/before/post-desktop.png`
- `bc31086f8c11f383a2f2094df6ae14e3aa53b40950e1c6dfca716375be976b3f` — `comparison/before/post-mobile.png`
- `291dd42652175fd8f345c9495c011bbad08c9f2ddd1fd9179193d57f1e832bea` — `reply-assertions.json`
