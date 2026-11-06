# dash-nodes PR #23: the protocol check counts again (production)

- PR: https://github.com/PastaPastaPasta/dash-nodes/pull/23
- Merged as `195c677f6e77c5ba44be2a857f1825e0f864e788` on 2026-11-06 at 06:35Z.
- Deployed by CD, with the app and the Worker both at that commit; verified at 06:55Z.

**How these were taken:** on https://radar.dashhq.org itself, with live data, in headless Chromium at device scale factor 2.

**What they show:**
- **Overview** (`/?scope=mn#readiness`), 1440 px light and 390 px dark: the "Protocol version" figure is back. 263 of 2,242 enabled masternodes run protocol 70242, 262 pass every check, and 1,924 fail only the version check.
- **Masternode card** (`/mn/<protx>#readiness`) for an enabled 23.x node that fails only the version check: the protocol row reads Fail, "Upgrade to Dash Core 24." The rules link points to Dash Core v24.0.0.

`/masternodes?dkg=protocol&status=Enabled` keeps the "Fails: protocol version" filter. There were no page errors.
