# radar PR #20: explorer /v24 lock-in outlook and pools

- **Before:** the exact base 6254df70 (main). **After:** PR head f9724ac6.
- Each tree got a production build (`pnpm --filter @radar/web build`) and was served through the real edge Worker (`review/serve.mjs`) on live mainnet data. The data includes the activation document with `window.pools` from dash-nodes d8f6e9e, deployed. Captured about 16:10 UTC on 2026-11-24 at block 2,577,698.
- Chromium (Playwright 1.56.1), 1440×900 at 1x and 390×844 at 2x, light and dark, full page. `*-new-sections.png` are crops.

SHA-256:
    edbdf2a6022baacb98344993bb84565c7aa3185eece43477a260a30cf4a3d4d3  before/before-1440-dark.png
    d3f8d3f1734dbe8c647c8ab22a107e4dee250677e0e5795259ef90904e28cfc5  before/before-1440-light.png
    14d4229d539129f452e291e11bf5f6fa5a9ac4ffaa6b8d58424b09f0310b6b2a  before/before-390-dark.png
    430413a9abf3c38d37c2cdb5b07e275914945235f4acf2a4f2ee60bc7e9c0187  before/before-390-light.png
    7ae4be2f8ab2a5d2f7e5b375ffd75b23fa0cee4c1c155f0d6b637f4d5a5de5cd  after/after-1440-dark.png
    bb200b23c5c79262b88e55db2e4f7cd060dd4d9ee9ad6c5386a845653a35a8a5  after/after-1440-light-new-sections.png
    a9e42719afdcd63fda551381fa93e0f8e2ee5b41aec6cabb78f5c256ca77d13d  after/after-1440-light.png
    1d21ec5a44096a03744695b828ac313742fe9ddece97f4c9193b91f4b0bbb4c8  after/after-390-dark-new-sections.png
    516be776b2946d8fae60e874adec414d67b5725712b1aae5ff7f5c1fd4f78b61  after/after-390-dark.png
    28aaa78346074a448f293f9bbb8154e83a7604a52db972dad0b4f6ec4b61e8d9  after/after-390-light.png
