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
