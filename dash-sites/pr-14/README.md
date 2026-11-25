# dash-sites PR 14: builder on a network with no contract

| | Revision | What it shows |
| --- | --- | --- |
| `before/builder-mainnet-signin.png` | base `7a54430` | mainnet build of the builder, sign-in step |
| `after/builder-mainnet-signin.png` | head `ed4ec8e` | the same page: publishing is not open, both sign-in buttons disabled |

Both are the builder built with `NETWORK=mainnet GATEWAY_DOMAIN=dash.site`, served locally and captured in headless Chromium at 1100x900 with no data entered.
