| Behavior | Before exact base | After full head | Fixture | Visible difference |
|---|---|---|---|---|
| From a fresh guest Yappr devnet session, open Sign In and click Create an identity | 4105c5d1c914f5d0838619da93c3b8d28b4a780e | ea277d0bfe90c0c7125c4615dfb377a2cee88201 | Same local /devnet build config, live bridge home, fresh context1280x1000 | Actual link opens bridge TESTNET before; DEVNET-MOUTAI after |

Both product revisions are independent clean builds of build:devnet. Destination is the actual external bridge as served at capture time, not a locally built bridge. No identity is created in these comparison captures and no credentials are entered. The external bridge response may change independently of Yappr; the requested popup URL and network badge are recorded. User manual devnet selection is covered separately in the onboarding QA run.
