# dash-nodes PR #13: DashHQ Radar icon (favicons, header mark, link preview)

PR: https://github.com/PastaPastaPasta/dash-nodes/pull/13

- **Before:** exact base `2c3f27058402549df8e47630fddb2b72252aaec3` (main).
- **After:** PR head `dc27227` (the icon commits `6c7117f` and `dc27227`).
- **How each side was served:** its `worker/` and `web/` were built with `worker/scripts/build.mjs`, which is what the Worker deploys. A local server served that `public/` with `/api/*` from the live Worker, on 127.0.0.1:8701 (before) and :8702 (after). Both sides show the same crawl.
- **Tab bars (`tabs-*.png`, `comparison/*/{light,dark}-window.png`):** a real headed Google Chrome on an Xvnc display, one window per theme, both tabs open. The light window uses the default theme; the dark one uses `--force-dark-mode`. Each window was captured with each tab active.
- **Headers:** desktop is cropped from those Chrome windows. 768 px is Chromium at 2x and iPhone is WebKit iPhone 13 at 3x, both via Playwright. At 440 px and below the header hides the logo by design (both revisions), so the iPhone headers show the tabs only.
- **`assets/`:** `og.png`, `icon-512.png`, `favicon-32.png` and `mark-96.png` as committed. `source.png` is the approved image-generated master they're cleaned from (`tools/icons/polish.py`).

SHA-256:

    3e607249424b589adda0084daadcaf08a396feb7293df60cff6313685d03599d  tabs-dark.png
    0f372909adc328b7062f7cbf99e805ddb8204d73390c9fe3519b5677c5e3fc6d  tabs-light.png
    de34622ce14be3098d62f28ff933ac019347128fef1e564ed08c5cd4902b592d  comparison/after/dark-window.png
    3cbe95dfe0e03bd96e07c48ac8df934f95077022c0eee770f27b98f329ed66ec  comparison/after/header-768-dark.png
    7d51d4081d82a1bd35b93e7f31ca0df6d0e634366973c260de9e2c94290d9bdb  comparison/after/header-768-light.png
    cfe8fcf054844941986d501bd4f0caed85391a641c6aaa7be7191c9d17aa753f  comparison/after/header-desktop-dark.png
    ca2a055d30ef8c930640c505ffd8f6d26b751e33981b8dd43ea999bd380a1607  comparison/after/header-desktop-light.png
    0ddd342d169a7458558c2d64adc06ce67fd0696a804cb5809a76d674e09f8bf0  comparison/after/header-iphone-dark.png
    35b8067048056326850ace5dcef1f624a6759fcaf111f8d638e12bf461443f8e  comparison/after/header-iphone-light.png
    de89a611437fa1c71caa633c6b79c9eb7f1c300a17a77279d135d9de82be27b5  comparison/after/light-window.png
    e4fe5651062061a66d9aacdbf5898b703ac7c019aefe9fef82819c0f5fc2b3c1  comparison/before/dark-window.png
    2405001f0be59d8641cf7609dae0b4cba8871cb16f906e61951aff8861c6adc0  comparison/before/header-768-dark.png
    3b2661a191dc1455bfc087b571712f5cda761e6f9b7be9c3f8a87ba07bbfc962  comparison/before/header-768-light.png
    b1e3fc3aff12736642b0afd65f4000bd182022031368b8547a9dca737d0fa994  comparison/before/header-desktop-dark.png
    7956ff2a9f5c268c45ac133525b9fa9d39001684efeb60d827dd33e27288e970  comparison/before/header-desktop-light.png
    0ddd342d169a7458558c2d64adc06ce67fd0696a804cb5809a76d674e09f8bf0  comparison/before/header-iphone-dark.png
    35b8067048056326850ace5dcef1f624a6759fcaf111f8d638e12bf461443f8e  comparison/before/header-iphone-light.png
    8373a8709824ca02a3814b99affbac5f55bddb5747fbd82f0046a7381ca00267  comparison/before/light-window.png
    1f9adcc1537a2c6a3fd542918f6906ec945355304a0c45f3a1af1338ed46b5b1  assets/favicon-32.png
    fb8dab75584f12cc9cf638c5f33b04f6aad050372991de345621b394198df07e  assets/icon-512.png
    1ea734609539adcca0a9672da631177926c1d4cda2553c256bf5ce86f2eba60a  assets/mark-96.png
    c43efe9b3927f055a29f2a947539da799837ec33b8b1f23def7317cac39b5f0b  assets/og.png
    38631d36433fba47a3ae1f066464e117cbe5dbd5ee7ac621bae721c6d3f8e9e2  assets/source.png
