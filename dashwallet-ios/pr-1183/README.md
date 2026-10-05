# dashpay/dashwallet-ios#1183 — first shielded send, develop vs PR (simulator)

PR: https://github.com/dashpay/dashwallet-ios/pull/1183 ("warm the Orchard prover before the first send")

## Provenance

| | |
|---|---|
| Before (exact PR base) | `develop` @ `7c0064d6b21f09d7a9ba86c1fecd77c819a09492` |
| After (full PR head) | `perf/shielded-prover-warmup` @ `28a7bc6142ddc6edc2cf3b4e6f00e60b266796b7` |
| SwiftDashSDK / FFI | `dashpay/platform` `v5.0-dev` @ `4cf12f2c9df1ff289e007dcceb46580bd45b3278` (clean), `build_ios.sh --target sim --profile release` → Cargo profile `release-ios` (opt-level 3, fat LTO, cg=1). Same static library linked into both apps; sha256 in `ffi-sha256.txt`. |
| App build | `dashpay` scheme, Debug configuration, normal simulator signing, built for the concrete simulator UDID. Both worktrees resolve `../platform/packages/swift-sdk` to the same checkout. |
| Simulator | new dedicated device "ShieldedPerf 1183" (iPhone 17, iOS 26.5, UDID `081CC9F7-0E89-4FC5-B2F9-237B82480619`) |
| Host | MacBook Pro, Apple M4 Pro (14 cores, 48 GB), macOS 26.5, Xcode 26.6 (17F113) |
| Network | Dash testnet, live Platform |
| Fixture | One wallet created in-app on this simulator, funded with 1 tDASH (in-app testnet faucet), 0.8 tDASH shielded. Both builds were installed over each other on the same simulator, so they used the same wallet data. |

## Procedure (per run, scripted: `tools/run.py`)

1. Install the build, terminate the app, start `log stream` (filter `SHIELDED-PROVER` / `SHIELD-TX ::`), cold-launch.
2. Wait for the home screen, then 15 s.
3. Start `simctl io recordVideo --codec=h264`.
4. Send → Internal → Shielded → Dash Wallet, 0.01 DASH → Continue → Confirm → PIN → wait for the "Transfer complete" toast. Then a second identical send in the same session (it waits until the shielded change note is spendable again).
5. Runs alternate develop / PR: B1 W1 B2 W2 … B5 W5. UI driven with `idb` accessibility taps (`tools/ui.py`).

W1 has only one send: its second attempt hit "Insufficient balance" because the change note was still pending; the wait-for-spendable step was added after that.

## Metrics

- **Confirm → "Transfer complete" (video)**: from the recorded video's frame timestamps: first frame of the Confirm button's tap highlight → first frame of the "Transfer complete" toast (`tools/video_times.py`). Includes the scripted PIN entry (~2.5–4 s).
- **SDK call**: app log `🛡️ SHIELD-TX :: withdraw route amount=…` → `withdraw route completed` (both builds have these lines). On the PR this equals `call_ms` in the `SHIELDED-PROVER` line.
- **Proof stage**: SwiftDashSDK `platform_wallet` log `Shielded withdrawal account=…` → `live activity entry recorded (pending)`. In `rs-platform-wallet` `withdraw()` this span is anchor/witness extraction plus `build_shielded_withdrawal_transition` (the Orchard proof, including the proving-key build when the key is cold). Broadcast starts right after it.
- **Broadcast + execution wait**: `live activity entry recorded (pending)` → `Shielded withdrawal broadcast succeeded` (network).
- **Host CPU idle**: `top` sample just before each run. Other agents were compiling and benchmarking Rust on this host throughout, so CPU contention was heavy and varied.

## Results

| Run | Build | Send | Confirm → "Transfer complete" (video) | SDK call (`SHIELD-TX` route) | `call_ms` (PR log) | Proof stage | Broadcast + execution wait | PR warm-up at launch | Host CPU idle |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|
| B1 | develop | 1st | 12.96 s | 9.30 s | — | **5.89 s** | 3.39 s | — | 20.0% |
| B1 | develop | 2nd | 7.33 s | 3.92 s | — | **1.40 s** | 2.52 s | — | 20.0% |
| W1 | PR | 1st | 7.20 s | 3.62 s | 3621 ms | **1.35 s** | 2.26 s | 2706 ms | 62.11% |
| B2 | develop | 1st | 13.12 s | 9.48 s | — | **2.70 s** | 6.76 s | — | 67.52% |
| B2 | develop | 2nd | 7.50 s | 3.58 s | — | **1.22 s** | 2.35 s | — | 67.52% |
| W2 | PR | 1st | 16.60 s | 13.23 s | 13230 ms | **1.20 s** | 12.01 s | 1601 ms | 42.59% |
| W2 | PR | 2nd | 7.70 s | 4.29 s | 4293 ms | **1.11 s** | 3.16 s | — | 42.59% |
| B3 | develop | 1st | 9.84 s | 4.95 s | — | **2.86 s** | 2.05 s | — | 0.0% |
| B3 | develop | 2nd | 9.21 s | 4.90 s | — | **1.74 s** | 3.14 s | — | 0.0% |
| W3 | PR | 1st | 10.02 s | 5.62 s | 5613 ms | **3.38 s** | 2.21 s | 1310 ms | 36.33% |
| W3 | PR | 2nd | 11.24 s | 6.27 s | 6273 ms | **3.44 s** | 2.81 s | — | 36.33% |
| B4 | develop | 1st | 12.15 s | 7.20 s | — | **4.19 s** | 2.97 s | — | 0.4% |
| B4 | develop | 2nd | 12.79 s | 5.93 s | — | **3.68 s** | 2.22 s | — | 0.4% |
| W4 | PR | 1st | 13.92 s | 8.88 s | 8874 ms | **3.37 s** | 5.48 s | 4136 ms | 0.0% |
| W4 | PR | 2nd | 12.88 s | 5.81 s | 5805 ms | **3.47 s** | 2.31 s | — | 0.0% |
| B5 | develop | 1st | 18.87 s | 15.30 s | — | **2.65 s** | 12.62 s | — | 12.87% |
| B5 | develop | 2nd | 7.25 s | 3.55 s | — | **1.16 s** | 2.36 s | — | 12.87% |
| W5 | PR | 1st | 7.12 s | 3.71 s | 3713 ms | **1.11 s** | 2.60 s | 1303 ms | 63.37% |
| W5 | PR | 2nd | 8.66 s | 4.92 s | 4924 ms | **1.34 s** | 3.55 s | — | 63.37% |

| Median (min–max) | develop 1st | PR 1st | develop 2nd | PR 2nd |
|---|---|---|---|---|
| Confirm → "Transfer complete" (video) | 12.96 s (9.84–18.87, n=5) | 10.02 s (7.12–16.60, n=5) | 7.50 s (7.25–12.79, n=5) | 9.95 s (7.70–12.88, n=4) |
| SDK call | 9.30 s (4.95–15.30, n=5) | 5.62 s (3.62–13.23, n=5) | 3.92 s (3.55–5.93, n=5) | 5.37 s (4.29–6.27, n=4) |
| **Proof stage** | 2.86 s (2.65–5.89, n=5) | 1.35 s (1.11–3.38, n=5) | 1.40 s (1.16–3.68, n=5) | 2.39 s (1.11–3.47, n=4) |
| Broadcast + execution wait | 3.39 s (2.05–12.62, n=5) | 2.60 s (2.21–12.01, n=5) | 2.36 s (2.22–3.14, n=5) | 2.99 s (2.31–3.55, n=4) |

- Proof stage, 1st minus 2nd send of the same session, develop: +4.49, +1.48, +1.12, +0.51, +1.49 s (median +1.48 s)
- Proof stage, 1st minus 2nd send of the same session, PR: +0.09, -0.06, -0.10, -0.23 s (median -0.08 s)

## Caveats

- Simulator proving runs on the Mac's CPU. An M4 Pro is much faster than a phone, so absolute times understate a device. Relative behaviour (whether the first proof pays for the key build) is what this shows.
- The host was heavily and unevenly loaded (sampled idle 0–68 %). That inflates and spreads every CPU-bound number (e.g. both sends of B4/W3/W4). Network time (broadcast + execution wait) is the largest source of end-to-end variance (2–12.6 s).
- The app was a Debug build of the Swift code; proving is in the release Rust library.

## Files

- `side-by-side-first-send-B2-vs-W5.mp4` / `.gif`: first send after cold launch, develop vs PR, aligned at the Confirm tap. The pair is the run of each build with the most idle host CPU (B2 67.5 %, W5 63.4 %), chosen before looking at its timing.
- `runs/<run>.mp4`: every run, full recording (labelled re-encode at 402×874 pt; originals kept locally).
- `logs/<run>/app-oslog.txt`: streamed app log lines; `sdk-platform_wallet-withdrawal.txt`: SDK withdrawal stage lines; `host-timings.json`: script timestamps, load and CPU samples.
- `results.json`, `results-table.md`, `tools/`: data and the scripts that produced it.
