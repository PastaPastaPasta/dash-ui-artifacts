# Balance picker help — simulator evidence

All captures run app commit `d8f9bd3e9587e5c7fc9566972cf4cbd952b891b5`, based on `727b4c18b0480422272d3787731bc7ab4128436e`. These show the new flows only, not a before/after comparison.

- Device: iPhone 16 Pro, iOS 26.5, 1206 × 2622 pixels.
- Simulator: Balance help preview (`3D639F9C-5E54-4C60-8439-F9843A0E7D51`).
- Fixture: isolated clone of the empty PR1100 Fixture (`2BA73F81-DD2A-4971-BA50-6D2C50FFCA4A`), Mainnet, English, Advanced mode enabled through Settings. No wallet was funded and no transfer submitted.
- App: `org.dashfoundation.dash`, dashpay Debug; signed simulator build, installation, launch, process liveness, and visible app verified. Private service plists were supplied locally and are not published.
- Standard captures use the default Large text size. The large-text capture uses Accessibility Extra Extra Extra Large.
- Every published image was inspected at original resolution. Temporary capture scripts and debugging were kept outside the product source; the source worktree is clean.

| Screenshot | Visible state |
| --- | --- |
| [Destination picker](screenshots/picker-dark.png) | Four separate info buttons; Shielded remains selected |
| [Transparent](screenshots/transparent-dark.png) | Everyday payments and public activity |
| [Platform](screenshots/platform-dark.png) | Platform payments and moving funds to other balances |
| [Shielded](screenshots/shielded-dark.png) | Private holdings and shielded payments |
| [Identity](screenshots/identity-dark.png) | Credits for usernames and app actions |
| [Source picker](screenshots/source-light.png) | The same help controls when choosing the source |
| [Light-mode help](screenshots/identity-light.png) | Identity help in the source picker |
| [Largest text size](screenshots/large-text.png) | Scrollable help sheet with a Got it dismissal button |

Interaction verification: opened each of the four explanations, dismissed each back to the same picker with the original selection intact, then selected Platform and confirmed the destination card updated. Opened source help too. At the largest text size, verified the full explanation is accessible and Got it returns to the picker. These are UI checks, not tests of transfer execution.

## SHA-256

```text
e57d18a24518005db3eb4f5a89354ca985142d0517776e9d3c82b3f24abf1dc2  screenshots/picker-dark.png
575e7f5293951434b960cdd86587e36e7d9746a1199da88f8f016ff125d615c1  screenshots/transparent-dark.png
b1325bb623c38c6e50e129c1d958785122484f53637a0bc4eaf2f0a2a5e71991  screenshots/platform-dark.png
c7675f3c152d403fd1b9617e50d63fcb94e73da55a461bfbd4d5d3931d689e72  screenshots/shielded-dark.png
034f7edc7c2323404362e2408519f30dd835072f4b2b0b2f8cf2ab9ac86def08  screenshots/identity-dark.png
6a5fcbfc6fac4ef918f1c88d37bfe649e95d5e344ccdcb39210d457892cb6a9a  screenshots/source-light.png
0234ecdc61a84e4f6d7c1e11db24dcce0d851f8cafef7ffd67276bd276e86446  screenshots/identity-light.png
84335cf4c3aab7049be3ac2ef41c9b3011f331c970d5b2358f4d64513194ce52  screenshots/large-text.png
```
