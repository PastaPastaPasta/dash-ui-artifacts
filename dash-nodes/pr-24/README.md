# dash-nodes PR #24: the Dash Core 24 activation tracker (production)

- PR: https://github.com/PastaPastaPasta/dash-nodes/pull/24
- Merged as `94498149abf83ee4ef4335d04f7bbc6e74b1db6a` on 2026-11-06 at 07:04Z.
- Deployed by CD (app and Worker at that commit); verified at 07:22Z.
- Production dashd: 24.0.0 on both networks.

**How these were taken:** full-page shots of https://radar.dashhq.org/v24, mainnet and `?net=testnet`, at 1440 px light and 390 px dark, plus the overview's card. Live data, headless Chromium, device scale factor 2.

**Mainnet** (tip 2,567,637; consistent with dashd's `getdeploymentinfo`):
- v24 is DEFINED, waiting for the start time and the masternode (EHF) signal.
- The median time should reach 9 Nov 2026 00:00 UTC at about block 2,569,125 (estimate).
- The first window that can count starts at block 2,572,416 (about 15 Nov, at the earliest). Lock-in can come at 2,576,448 at the earliest, and activation at 2,580,480 (about 29 Nov).
- The first window's threshold is 3,226 of 4,032 blocks (80.0%), falling to 2,420 (60.0%) by the 11th.
- In the llmq_400_85 quorum that would sign now, 38 of 400 members announce protocol 70242; 340 signatures are needed. That count is an estimate, not the trigger.

**Testnet:** active since block 1,578,000. The signal was in block 1,565,132, and the history window by window comes from real headers.

There were no page errors or overflow. A `#thresholds` deep link lands just under the header.
