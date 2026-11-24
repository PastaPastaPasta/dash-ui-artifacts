# dash-nodes PR #35: /v24 lock-in outlook and pools

- **Before:** live https://radar.dashhq.org/v24 (main, deployed a79528b), captured 2026-11-24 15:13 UTC at block 2,577,678.
- **After:** PR head f5d489c (supersedes the ea25c76 captures in the previous commit of this folder), `web/` served locally with `/api/v1/mainnet/activation` answering the live mainnet document at block 2,577,670 (Dash Core 24.0.0), plus the `window.pools` the collector computes. The pools were checked against the same 1,223 blocks' versions and coinbase scripts read over RPC from a synced mainnet node. The header says "status unavailable" only because that local server doesn't serve the status API.
- Chromium (Playwright 1.56.1), 1440×900 at 1x and 390×844 at 2x, light and dark, full page. `*-new-sections.png` are crops of the two new sections.

SHA-256:
    d4cece6640a78c767f809c426fce951a07ed48d94fc112d4c18ab5b818f9d0c4  before/before-1440-dark.png
    cf7393f8672501306dba261f2c148940923aeebc8189dba8dfb18f46608905f7  before/before-1440-light.png
    fe4334ef618890f477b05b11f09dfb4d432280c45e1d3aa868f868626909d5f0  before/before-390-dark.png
    5ce6c4cc89f1b67bd466c3ef93a69e36abd69cf3d7d4baf94cec125a32c8b892  before/before-390-light.png
    72fdf0d5c07e29991eb2e2d1d56fc9e68d9805596aa438da47b1f175cbad1180  after/after-1440-dark-new-sections.png
    2678676a40d5e704c3875c30f560cb89d78a1294bdf2058551b08c97e0868fe2  after/after-1440-dark.png
    44c20ac524abdd2a1f3835f98d4b589cd724bee2f1f7d50a8da93cd0f4898793  after/after-1440-light.png
    4394c703448551597e217a267cc9e31b5ebab459438820d198aee27aee9d26a4  after/after-390-dark-new-sections.png
    3f6357293ea1ce1c72646b7d3c05a80c9d133161b8edaa3c5f2b2d133e94956f  after/after-390-dark.png
    a81a924cc29ecbad47512cea45d2f88e147129482d855486eb9bae235740b6af  after/after-390-light.png
