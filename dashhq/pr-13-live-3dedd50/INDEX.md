# dashhq.org live home map after PR #13 (merge 3dedd50)

- Captured 2026-11-24 after the GitHub Pages build of 3dedd50bf38e3a7cc8b3dbf032c996e183d0e9b2 finished.
- Source: https://dashhq.org/ (live), `#map` only. Playwright 1.55 with Chromium headless shell; a cache-busting query on the page.
- ipv4/: captured from agentbox; Chromium resolved dashhq.org to GitHub Pages IPv4 (185.199.108-111.153).
- ipv6/: captured from a boat.dev sandbox with Chromium forced to [2606:50c0:8000::153] via --host-resolver-rules.
- 1440/800/680/679 at 1x, 390 at 2x with mobile emulation; light/dark via prefers-color-scheme.
- 679 vs 680: the tier grid switches from 2 columns (<=679 px) to 4 columns (>=680 px).

## SHA-256
    f2753f34471436a380a922d8f76586c0c10a6b65d83dec68e9587198673414d7  ipv4/1440-dark.png
    6882a8991f71c3933f52db9a484c4b11e40e6bac4aaa494fe0dbe9dca89ce96b  ipv4/1440-light.png
    a31657e95e1da192bf08f7e4c2f517e2824e408271c1a361fac963da4916378e  ipv4/390-dark.png
    c836eca512ac657f106cf87b0a97b462a204e9ef7c3e62209caca2d82c4ebf81  ipv4/390-light.png
    72e4b28d92e821579992cc00656a05621f12f799c83f2253b65da76eb0080846  ipv4/679-dark.png
    5d8975e8dcc209722441fc7c40df641f72f450b5c1749c45d831bd2034b2672d  ipv4/679-light.png
    108ee10e7e4cc1d7a66a41c43d85808b7deab31c00963e122257755c6c3f65aa  ipv4/680-dark.png
    27a9ae229b1552150a472b5ca4e425f0d957bd16e0b3111f93f758939c667d7c  ipv4/680-light.png
    4dc60e1744f401e7cde5a16474878d1cec2561ad6d55db859e4c46f17be4a0cf  ipv4/800-dark.png
    2a695103226c4f418ab470f20f7a23a66738076eeec3bb7125c9207569449d5e  ipv4/800-light.png
    f0f335399d381d26d23607687b929ec14cd29a3923c9d3b4babf383ea7dfe383  ipv6/1440-dark.png
    0306741b146922dccb28b785c175636bb496ca5c7f8a0a83742c1dd670a7ed83  ipv6/1440-light.png
    ac6a843c87a21f1ac04f8151fb7ecd831a0c91e7994e14304ffa0286f7af175b  ipv6/390-dark.png
    759b3bb1bc7bfb5fd3e391ce3c59802d35637d64f001162a5c8f329cb855562e  ipv6/390-light.png
    d8f4e6c7c822494db650619a0061b7e74fa81cabd0edd07a5604140c77b41abd  ipv6/800-dark.png
    a7e80e02d5fe94b717bf4e6876e783bf7ee607e9d9c8f8d04b9c7297e34095d2  ipv6/800-light.png
