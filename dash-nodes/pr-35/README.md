# dash-nodes PR #35: /v24 lock-in outlook and pools

- **Before:** live https://radar.dashhq.org/v24 (main, deployed a79528b), captured 2026-11-24 15:13 UTC at block 2,577,678.
- **After:** PR head ea25c76, `web/` served locally with `/api/v1/mainnet/activation` answering the live mainnet document at block 2,577,670 (Dash Core 24.0.0), plus the `window.pools` the collector computes. The pools were checked against the same 1,223 blocks' versions and coinbase scripts read over RPC from a synced mainnet node. The header says "status unavailable" only because that local server doesn't serve the status API.
- Chromium (Playwright 1.56.1), 1440×900 at 1x and 390×844 at 2x, light and dark, full page. `*-new-sections.png` are crops of the two new sections.

SHA-256:
    d4cece6640a78c767f809c426fce951a07ed48d94fc112d4c18ab5b818f9d0c4  before/before-1440-dark.png
    cf7393f8672501306dba261f2c148940923aeebc8189dba8dfb18f46608905f7  before/before-1440-light.png
    fe4334ef618890f477b05b11f09dfb4d432280c45e1d3aa868f868626909d5f0  before/before-390-dark.png
    5ce6c4cc89f1b67bd466c3ef93a69e36abd69cf3d7d4baf94cec125a32c8b892  before/before-390-light.png
    b298eab23525f28444f51cc4d11562b5a77a7a89ac9a764d25807d2baf84e562  after/after-1440-dark-new-sections.png
    ca8252f4dcfb699f125fd8bb5658ce4afc6f4b1dfe60eec7980f3a3251d78460  after/after-1440-dark.png
    95c15afb6524c937001487960d53d83dc627e7b5f2e4d323808509c823453949  after/after-1440-light.png
    3bda15c505f386653f6cd129cf78f4864c4925c351db15d1d8f1380f83ba8730  after/after-390-dark-new-sections.png
    ad97c063262f51bb97bdcc00d51faf60e386a630528507604a2d40d4cefb5b3e  after/after-390-dark.png
    7522e9b29af96282b8e8c2cb4d25115d9ebcc1fad3df8993987e567a78399a0e  after/after-390-light.png
