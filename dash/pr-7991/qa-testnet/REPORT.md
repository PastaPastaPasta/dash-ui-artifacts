# Dash Core PR #7991 GUI QA report

2026-11-01, Dash testnet. The 400/300/300 registration completed and confirmed. No confirmed product defect was found. B.5's participant overpay-warning/signing path remains BLOCKED because the coordinator refused to lock the tampered funding.

Only Dash-Qt-QA7991-A/B/C were selected, individually by app name. GUI actions used Computer Use; checks used dash-cli; screenshots used the unchanged winshot.py, plus app-specific window captures for native picker popups. No source changes, builds, relaunches, commits, or pushes were made. All three instances remain running.

All three runtime versions are `v24.0.0-rc.2-707-g3d4f99b64fa1`, matching the brief's PR head bab1534 plus local Show Details sizing fix. The source checkout has since moved to `e6b3e4a221eb37e3616e9223789264d6b35734c9`; this report concerns the running build, not that checkout. Runtime records and hashes are saved. This is a single-build QA pass, not a before/after comparison.

Evidence filenames below are relative to `/Users/pasta/qa7991/evidence/`. Every captured image was opened and inspected; hashes are in `screenshots-sha256.txt`. The operator secret is saved locally in `operator-key.txt`, mode 0600; its contents are excluded from this report and screenshots. Chronological notes, including a superseded interim stop and its correction, are in `notes.md`. This final report replaces the interim report.

| step | verdict (PASS/FAIL/BLOCKED) | evidence | notes |
|---|---|---|---|
| Initial state | PASS | 001-initial-A.png; 002-initial-B.png; 003-initial-C.png | Three distinct running apps/wallets inspected. Masternodes tabs already visible. |
| A.1 coordinator/invitation | PASS | 011-coord-shares.png; 012-coord-reserved.png; 013-coord-invitation.png | Session B076D3, Coordinator/P1/P2 400/300/300. Empty service, generated operator key saved, default exit terms. Coordinator reserved; Copy Invitation pinned and visible. |
| A.2 picker and address switching | PASS | 020-p1-picker-unselected.png; 181-switch-replaces-recorded-addresses.png; 182-switch-restores-P1-addresses.png; 183-taken-picker-popup.png | Starts Choose your share. Coordinator labelled taken; mouse attempt and keyboard Up did not select it. Supplemental fresh session established recorded P1 addresses, reserve/release, switch to P2: fresh different addresses; switch back: P1 addresses restored. All four addresses confirmed ismine=true. Unrecorded draft addresses initially stayed the same when switching; no regression inferred from that alone. |
| A.2 trusted unconfirmed reserve/reply recopy | PASS | 026-p1-waiting-details.png; B-self-send-at-reserve.json; B-main-locks.json | P1 self-send output reserved with zero confirmations, safe/trusted=true, InstantSend=true. Cleared clipboard; Copy My Reply restored byte-identical details. This does not isolate own-change behavior without InstantSend. |
| A.3 stale invitation | PASS | 030-p2-stale-share2.png | C imported original invitation, chose P1, did not reserve. |
| A.4 merge P1 | PASS | 040-coord-p1-merged.png | Board 2/3; P1 Details/Funded checked. Updated invitation copied. |
| A.5 stale-choice recovery | PASS | 050-p2-reinferred-share3.png; 051-p2-waiting-details.png | C dropped share2 and inferred share3; P1 taken. C fields were not B's addresses. No Release before C reserved; B locks unchanged. C reserved; reply recopy byte-identical after clipboard clear. |
| A.6 lock terms | PASS | 060-coord-all-funded.png; 061-coord-lock-confirmation-top.png; 062-coord-lock-confirmation-funding.png; 065-coord-locked-terms.png | All funded. Coordinator owner/refund/voting marked in this wallet; others unmarked. Funding contribution 400.001. Locked successfully; Copy Locked Terms and Unlock terms visible below scroll area. |
| A.7 approvals | PASS | 070-p1-approval-terms.png; 072-p2-approval-terms.png; 073-p1-approval-recopied.png; 074-p2-approval-recopied.png | Correct share marked you; wallet marks only own addresses. B/C contribution 300 each, no warning, matching reserved inputs minus change. Both approved; approval replies recopied byte-identically. |
| A.8 signatures/request | PASS | 080-coord-signatures-terms.png; main-signing-request.txt | Coordinator full term sheet and approved-terms reminder verified in AX; Copy Signing Request pinned. |
| A.9 participant signing | PASS | 090-p1-sign-top.png; 091-p2-sign-top.png; 092-p1-sign-funding.png; 093-p2-sign-funding.png; 094-p1-signed-waiting.png; 095-p2-signed-waiting.png | Both show approved-terms reminder, full terms and contribution; both signed and copied replies. |
| A.10 broadcast/Complete/Finish | PASS | 100-broadcast-details-top.png; 101-broadcast-details-middle.png; 102-registration-complete.png; 103-finish-main-A.png | Show Details contained Transaction ID and full term sheet in AX; screenshots show upper/middle sections. Send succeeded. Complete showed proTxHash and pinned Copy Final Record. Finish closed wizard only; all three processes survived. |
| A.10 confirmed registration/shares | PASS | 170-confirmed-A-shares.png; 171-confirmed-B-shares.png; 172-confirmed-C-shares.png; final-rpc-checks.json | All three list the registration; details mark share1/400, share2/300 and share3/300 respectively as you. Height 1583595; 18 confirmations at recorded final RPC check. |
| B.1 Save and Close/resume/discard | PASS | 110-save-resume-reserved.png; 111-save-close-choice.png; 112-save-close-main.png; 113-resumed-reservation.png; 115-discarded-main.png | Fresh 8AEE8F. Saved after reservation; opened saved file, same share/addresses/locks. Discard and Release emptied locks. Clean saved-session Cancel preserved reservation; reimport then Cancel exposed explicit Discard route. |
| B.2 Release | PASS | 120-release-before.png; 121-release-after.png; B2-locks-after.json | Fresh 928774. Release unlocked coins and enabled picker; locks empty. |
| B.3 coordinator Me locking | PASS | 131-coord-me-locked.png; 132-taken-me-row-disabled.png | Fresh EDCDFF. Reservation locked own Me selection. After releasing own reservation, taken P1 remained disabled while own/P2 enabled; clicking P1 did not change selection. |
| B.4 same-share race | PASS | 141-race-B-reserved.png; 142-race-C-reserved.png; 143-race-conflicting-reply-rejected.png; 144-race-B-after-update.png; 145-race-C-update-refused.png; 146-race-C-released.png | Fresh C859EF. Both reserved share2. A accepted B and rejected C: P1's share already has details from another reply. B imported next invitation and kept its own reply. C rejected it with the same conflict and retained its own reply. C Release unlocked C only; B locks byte-identical. No cross-wallet reservation ownership observed. Loser must release/discard and restart from updated invitation. |
| B.5 tamper rejection | PASS | 150-overpay-coord-tamper-warning.png; 151-B5-lock-refused.png; B5-tamper-description.txt | Fresh 2FBF58, shares 400/299/301 to give P1 exactly 2 change. Saved all-funded coordinator session; changed only contributions[1].change.amount from 200000000 to 0 duffs. Import warned edited message; locking refused funding/prepared-transaction mismatch. |
| B.5 participant overpay warning/signing | BLOCKED | 151-B5-lock-refused.png | Coordinator could not produce locked terms after the requested single-field edit. Participant import/warning/signing therefore unreachable; no claim that the warning appeared or was absent. |
| B.6 Finish/Cancel/window close | PASS | 103-finish-main-A.png; 112-save-close-main.png; 115-discarded-main.png; 160-fresh-close-session.png; 161-window-close-main-A.png; final-processes.txt | Finish, Cancel/Discard, Save and Close, participant Close, and fresh-session window close all left main apps alive. Fresh close session 4966FC discarded. |
| Supplemental foreign-owner refusal | PASS | 180-foreign-owner-refused.png; foreign-owner-check.json | Fresh 1A4858. B owner changed to coordinator-owned address, ismine=false in B; Reserve refused: The owner address must belong to this wallet. Restored own address for subsequent checks; discarded session. |
| Final cleanup/liveness | PASS | 174-final-A-list.png; 175-final-B-list.png; 176-final-C-list.png; final-rpc-checks.json; final-processes.txt | All disposable sessions discarded. A/B/C listlockunspent empty; all three main windows on Masternodes, one owned shared registration each. |

**Product defects:** No confirmed D-n defect; no S1/S2/S3/S4 severity assigned. B.5 is a coverage limitation with successful earlier validation, not a demonstrated missing-warning defect. The race rejected conflicting ownership and preserved each wallet's reservations. No crashes or loss of funds/session state were observed.

**Environment/harness observations:**

- **ENV-1 — Qt accessibility/focus/popup capture.** Some AX actions checked navigation controls without changing content; visible-position fallback worked. Native picker input across calls was unreliable. Popups use layer 101 and are excluded by winshot's layer-0 filter; app-owned popup screenshots used observed window IDs with screencapture (130-picker-popup.png, 140-race-C-menu.png, 183-taken-picker-popup.png). Re-querying state, native keyboard input and raising the correct dialog resolved remaining checks. No screenshot helper edits or other-app interactions.
- **ENV-2 — Save-panel path.** Encountered the known root-path write error once in B.1. Retried Cmd-Shift-G with full path, inspected the evidence destination, saved and reopened successfully. No failure with a correctly chosen folder; no product defect assigned.
- **ENV-3 — runtime/source provenance.** Checkout moved, runtime build still matches the brief. No rebuild/relaunch.
- **ENV-4 — testnet funding/confirmation delay.** Registration change was initially untrusted pending, requiring fresh faucet outputs for edge sessions. Registration later confirmed; final recorded RPC height 1583612, no remaining confirmation blocker.

**proTxHash, transaction IDs and funding:**

Registration/proTxHash: `38c3acb9c3fb86efc51133ae2021167fb27f33e3021d1fe2771e83af009d8aa4`. Collateral output 3; confirmed at height 1583595, 18 confirmations at 2026-11-01 10:54:01 -06:00.

| wallet | input | input tDASH | change tDASH | contribution tDASH |
|---|---|---:|---:|---:|
| A | ae038e2182ae47c49aece88da4684bd708484b6e29e48c5640465067c960048a:0 | 650 | 249.999 | 400.001 |
| B | abd4ab6739bf2345903a68f3d3bcb5adfad4f4662138411771cd2060ae0198c4:0 | 449.99999809 | 149.99999809 | 300 |
| C | d8e77218a940c46fdd0ecab3a0a8d18dbd52d571d5a6dbeb99fe870c4275a2db:0 | 350 | 50 | 300 |

B's input transaction is the requested self-send. Total inputs 1449.99999809 minus change 449.99899809 = 1000 collateral + 0.001 network fee. Service was intentionally left empty; registration is present but not running a masternode service, with PoSe ban height equal to registration height.

Extra faucet requests were once per fresh address, without rapid retries. All destination amounts verified; all six InstantSend=true. Confirmations below are from `faucet-final-verification.json`.

| wallet/amount | destination | txid | confirmations |
|---|---|---|---:|
| A / 151 | yciuZQTfVqMJHtHs5QQgCewbV52o8uqG9F | f2fd6d0172838b458bfb3fa8fe548b96128c35845a6b03ab76dc2c3f2e39da44 | 22 |
| B / 151 | yjG4J4rLVETteqPtaBma7soKNDyd9L5Lf6 | 8ec9ccf16cd69a28c80cabf4bb889e30ee6f98c1a405eeb5d969bce3174fa2ab | 22 |
| C / 251 | yh8QX7hUWPKydLByCTzXSyH1ix8PTZzLHk | ce91e5076b473a714835606b5af409c25a25a085a3e5abd572a9ea470ab1d49e | 22 |
| A / 250 | yRv4qrMqJJPC2TtRnvf7GkLd3K2ZrWoVQR | 6fb45a8f285462344e0e6c8eb3e7dd3aa162443089b3e10713593fea8279af59 | 19 |
| B / 150 | ygeifY5jFRiF8E8TtfAo5qyZLeLjoXmFLe | de366eab24ec283c68ec6355def58abec945f492c9b7ae296fbc473d59dae09d | 19 |
| C / 50 | yQmwbGm8qAhMMKnTUmSniGLKwgJUpwgUFK | d8d66b52c57175bbaacb3d2d457216ec89d3c4ba0fbdb1dee8a173d0d7907321 | 19 |

Final state: A PID 57585, B PID 21407, C PID 21592, all running. No disposable session locks remain. Final visible state is the Masternodes tab in each app; each lists the confirmed shared registration. Saved final record: `main-final-record.json`.
