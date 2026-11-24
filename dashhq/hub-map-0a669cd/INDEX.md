# dashhq home map cleanup — UI proofs

- Before: exact base `cac660f09` (PastaPastaPasta/dashhq main, Merge PR #12)
- After: full PR head `0a669cdeab679827c46c6ff4da46609cb6924ed1` (branch `hub-map-main`)
- Capture: Playwright 1.55 + Chromium headless shell, served locally with `python3 -m http.server`; screenshot of `#map` only.
- Viewports: 1440 and 800 CSS px at 1x; 390 CSS px at 2x with mobile emulation. Light and dark via `prefers-color-scheme`.
- Live data (Mainnet pulse line) is outside `#map` and not in these crops.
- `og.png`: 1200x630, light, `#map` only with the "Browse all 70 projects" button hidden; byte-identical to `og.png` in the PR head.

## SHA-256
    69bc4e3873ca02d1078fab239998e88461ba3d4dfa09b5d1e7593c5566051822  before/1440-dark.png
    64d1b84dde750359a0521a4da5f6fcf1267b48d516f39c777eabc02948d921c0  before/1440-light.png
    ad2fa2b6c781783b5bf9bcfeb1895335ed08b8ead12d6e79354ba538f0e66a3c  before/390-dark.png
    31189f51551662bd864b5f50813bcd38e1d2edc1d49df2597cd74e1bf6aa0921  before/390-light.png
    3ebdb72db1add0d9c1e7ffc1f04a3c580a78dd19e5e950a6401368fcb131f587  before/800-dark.png
    ae8f409fc7dc35e7a310bae92e753c547c705209c87efb4d701dce726c6a3f97  before/800-light.png
    f2753f34471436a380a922d8f76586c0c10a6b65d83dec68e9587198673414d7  after/1440-dark.png
    6882a8991f71c3933f52db9a484c4b11e40e6bac4aaa494fe0dbe9dca89ce96b  after/1440-light.png
    a31657e95e1da192bf08f7e4c2f517e2824e408271c1a361fac963da4916378e  after/390-dark.png
    c836eca512ac657f106cf87b0a97b462a204e9ef7c3e62209caca2d82c4ebf81  after/390-light.png
    4dc60e1744f401e7cde5a16474878d1cec2561ad6d55db859e4c46f17be4a0cf  after/800-dark.png
    2a695103226c4f418ab470f20f7a23a66738076eeec3bb7125c9207569449d5e  after/800-light.png
    f80a8a7ef0585734cbbb152682e4bc57a18f80cc469835183a0b4a44f6e0008a  og.png
