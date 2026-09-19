# Dash Core — shared masternode GUI (follow-up to dashpay/dash#7437)

Native `dash-qt` evidence for the pull request that adds the shared
masternode wizard and maintenance dialogs.

- **Before:** the pre-existing UI branch commit `58df82d2118c90b9def83d98fcef8b860d0b6e78`
  (`origin/codex/mn-shares-ui-on-7437` rebased onto `develop` at
  `38122e62124fbe58ebc99fa0367c97c25a7073ef`). This is the starting point the
  PR replaces; `develop` itself has no shared masternode GUI, so there is no
  earlier "before".
- **After:** PR head `e46c7a214b` (rebased onto `develop` `f9f015bf43` on
  2026-09-19). The `after` images were captured at
  `b622037b4fb4060a29f99b124fef053c4c1413fd`. Since then the source changed
  only in ways with no visible effect: the release note text, a struct
  initializer fix for a CI warning, a byte cap on pasted maintenance requests,
  a nested-event-loop guard in the masternode list, a removed unused member
  and a header comment (CodeRabbit round 1).
- **Fixture:** every image comes from `SharedMnWalkthroughTests`
  (`src/qt/test/sharedmnwalkthroughtests.cpp`), which drives the real dialog
  classes against an in-process regtest node with three descriptor wallets
  (`coord`, `alice`, `bob`), broadcasts a real shared ProRegTx, mines it and
  verifies it in the deterministic masternode list before opening the
  maintenance dialogs on that entry. Run with
  `QT_QPA_PLATFORM=minimal:enable_fonts DASH_QT_SHOTS_DIR=<dir> ./src/qt/test/test_dash-qt`.
  All keys, addresses and amounts are throwaway regtest data.
- **Rendering:** headless `minimal` platform, Fusion base style with the Dash
  light stylesheet, wizard pages at 1000×800, maintenance dialogs at their own
  size. Message boxes lay out narrowly on this platform; that is a capture
  artefact, not product behaviour.
- Each folder has a `manifest.txt` (filename → description).

## Before / after

| Surface | Before (58df82d2) | After (PR head) |
|---|---|---|
| Landing page | [before](comparison/before/03-coord-landing.png) | [after](comparison/after/02-coord-01-landing.png) |
| Participants page | [before](comparison/before/06-coord-participants.png) | [after](comparison/after/06-coord-04-participants.png) |
| Participants, invalid roster | [before](comparison/before/05-coord-review-invalid.png) | [after](comparison/after/05-coord-03-participants-invalid.png) |
| Masternode settings | [before](comparison/before/07-coord-settings.png) | [after](comparison/after/07-coord-05-settings.png) |
| Exit terms (early period / penalty) | [before, hidden behind "Show advanced terms"](comparison/before/08-coord-settings-advanced.png) | [after](comparison/after/08-coord-06-exit-terms.png) |
| Funding / your contribution | [before](comparison/before/11-coord-funding-ready.png) | [after](comparison/after/10-coord-08-contribution-reserved.png) |
| Operator secret | [before, printed in clear on Settings](comparison/before/07-coord-settings.png) | [after, gated save page](comparison/after/11-coord-09-save-operator-key.png) |
| Coordinator waits for replies | [before, sequential hand-off](comparison/before/14-coord-landing-waiting.png) | [after, status board](comparison/after/12-coord-10-invite.png) |
| Participant fills their share | [before](comparison/before/16-alice-participants-filled.png) | [after](comparison/after/15-alice-13-alice-share-ready.png) |
| Participant waiting page | not available | [after](comparison/after/16-alice-14-alice-waiting-for-terms.png) |
| Lock terms | [before](comparison/before/33-coord-review-complete.png) | [after](comparison/after/22-coord-17-lock-confirm.png) |
| Result of locking | [before: RPC method not found](comparison/before/35-coord-lock-terms-result.png) | [after: approvals page](comparison/after/23-coord-18-approvals.png) |
| Participant approves terms | not reachable | [after](comparison/after/24-alice-19-alice-approve-terms.png) |
| Signatures round | not reachable | [after](comparison/after/29-coord-22-signatures.png) |
| Registration complete | not reachable | [after](comparison/after/36-coord-27-complete.png) |
| Masternode list, Shared filter | [before, empty](comparison/before/42-masternodes-tab-shared-empty.png) | [after, registered entry](comparison/after/38-masternodes-29-tab-shared.png) |
| Details view | not available | [after](comparison/after/39-masternodes-30-details-html.png) |
| Context menu | not available | [after](comparison/after/40-masternodes-31-context-menu.png) |
| Change Reward Address | [before](comparison/before/37-maintenance-update-share.png) | [after](comparison/after/43-maintenance-34-update-share-filled.png) |
| Dissolve Now | [before](comparison/before/38-maintenance-dissolve-tab1.png) | [after](comparison/after/45-maintenance-35-dissolve-now.png) |
| Dissolve Together | [before](comparison/before/39-maintenance-dissolve-tab2.png) | [after](comparison/after/47-maintenance-37-dissolve-together-prepared.png) |
| Standby Dissolution | [before](comparison/before/40-maintenance-dissolve-tab3.png) | [after](comparison/after/49-maintenance-39-standby-created.png) |
| Rotate keys | [before](comparison/before/41-maintenance-rotate-keys.png) | [after](comparison/after/51-maintenance-41-rotate-keys-prepared.png) |

Full sets: [before (42 images)](comparison/before/) · [after (51 images)](comparison/after/).

## What the after images show

- The flow completes: before, "Lock Terms" ended in "This command is not
  available" because five RPCs were called by names that do not exist; after,
  the same session reaches approvals, signatures, broadcast and a registered
  masternode.
- Three parallel rounds (Invitation → Details, Locked Terms → Approvals,
  Signing Request → Signed Contributions) replace the sequential draft
  hand-off; a status board shows who has done what on every page after the
  invitation.
- One "Paste From Clipboard" entry point routes any message; every copy and
  paste shows a session code and a message code.
- The operator secret is shown once on its own page with a typed
  confirmation instead of being printed in clear on the settings page.
- Term sheets, boards and payout tables are shown in full; amounts trim
  trailing zeros; shares are numbered "Share k of n" everywhere.
- Maintenance dialogs open at a size that shows their content, use amount
  fields instead of raw duff spinboxes, and follow the same request /
  approvals / send pattern as the wizard.

Every image was opened at original resolution and checked for the expected
page, role, state, clipping and personal data before publication.
