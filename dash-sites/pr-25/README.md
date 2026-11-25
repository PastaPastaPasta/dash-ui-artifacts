# dash-sites #25: external npm assets and brotli (manifest v2)

- **Before, the error page.** Rendered with `messagePage` from `main` (fa9abb9) using the exact strings the old shell's `SiteHost.respond` uses when a file can't be used. The old shell had no external-asset path, so this is the page it showed for any file it could not serve.
- **After.** PR head 8b78011, through the real `SiteHost` service worker in headless Chromium (boat.dev). The site is Forge's dash.site build from dash-forge #726 (beb3c2f1+6ba0e401), packed with `--brotli --external` into 201 chunks. Mainnet data is read live.
  - `error-page-mismatch.png`: both CDN copies of `@dashevo/wasm-sdk@5.0.0-rc.8/dist/raw/wasm_sdk_bg.wasm` had byte 1000 flipped (Playwright route).
  - `error-page-unreachable.png`: both CDNs were blocked.
  - `app-with-refused-sdk.png`: Forge's own banner when its SDK is refused; nothing ran.
  - `repo-sdk-from-npm.png`: normal load, with the SDK verified from jsDelivr.
  - `wallet-sign-in.png`: App Connect QR.

SHA-256 of each file: see SHA256SUMS.
