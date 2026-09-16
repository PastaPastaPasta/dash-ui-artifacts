# External-wallet fixture and compatibility limits

A bounded metadata search across 23 historical transcripts found no surviving configured iOS simulator fixture. `simctl` lists no devices under the installed iOS 26.5/watchOS 26.5 runtimes. Two compiled app bundles survive, but their source revision and wallet data were not established. No simulator was modified or erased.

Source compatibility checks:

- Yappr `eb895be71a7207c73fb9329ac9d9bb7b398f53da` emits `dash-key:<base58>?n=d&v=1` and reads devnet key responses from contract `AnNHfJMavkjHK5cKj9ML2iygXKmhcGwAQpbimgrhE257`. The request contains an application contract ID but does not transmit the separate exchange contract ID.
- iOS wallet `f9d14cb307e6e1eb85edcd83b02a9d9c675055ff` parses network d, but `PlatformDashConnectDataSource.swift` defaults/asserts testnet only and rejects a non-testnet runtime. It hardcodes testnet response contract `7UaqHGBJBbRLJ4fUWS45cnud8PPUugJWoGTt1SKwHJ2P`.
- Android wallet `ee56d81a75960414fb61d969cc361cef72a5bdd7` likewise gates real publishing to testnet, verifies the QR network matches the wallet, and hardcodes that testnet contract.
- Local Dash Evo Tool `9d85c17068e1a1ae69c180a9d2d0bbf1cd2b5bab` has devnet and DashPay support but no wallet-side dash-key/dash-st handler was found. Local dash-desktop and platform-auth searches found no supported wallet demo; platform-auth provides app-side request/poll/decrypt functions.

No supported external wallet for this devnet protocol was identified in the bounded search. QR login, wallet GUI interoperability and mutual DashPay-contact import remain unverified; no protocol response was fabricated. The separately documented commerce test used a fresh SDK-backed QA payer and actual chain settlement, which does not establish an external wallet GUI pass.
