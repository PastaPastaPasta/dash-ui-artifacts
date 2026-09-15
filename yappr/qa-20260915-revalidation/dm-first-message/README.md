# First-DM claim revalidation

The real application at exact staging commit `4105c5d1c914f5d0838619da93c3b8d28b4a780e` successfully sent the first direct message between two seeded identities. A fresh sender session and a separate fresh recipient session both displayed the persisted plaintext. These are **same-revision validation screenshots**, not a before/after implementation comparison.

- `yappr-dm-current-after-send.png`: real sender immediately after first send. The compose input is clear and the sent message is visible. Sidebar absence is recorded separately as an unisolated observation.
- `yappr-dm-current-sender-fresh.png`: the same message after fresh sender session.
- `yappr-dm-current-recipient-fresh.png`: the same first message decrypted in a fresh recipient session, which had not been initialized before the send.
- `yappr-live-dm-schema-review.json`: public live contract snapshot disproving the recipientId-required theory.
- `provenance.json`: exact identity IDs, text, commit, fixture, steps, limitations, SHA-256 hashes.

No screenshot contains private key material. All three images were visually inspected. No fixed-after claim is made: no product code changed.
