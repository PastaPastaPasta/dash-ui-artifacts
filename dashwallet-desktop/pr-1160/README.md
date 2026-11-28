# Home balance breakdown during pending payments

The before captures use the PR merge base `aff0e64e381bf282060865ea823d41d2c0efc96a`. The after captures use head `31a96305e7335d631f8d350916f00ec7748f32a4`. Both render the funded testnet fixture at its fixed clock in Chromium at 1× scale. Filenames identify the revision, pending pool, viewport width and theme.

| Fixture | Spendable amounts in tDASH | Pending in tDASH | Visible change |
| --- | --- | --- | --- |
| Core, wide and narrow | Core 0.95446003, Shielded 0, Platform 0 | Core 0.4960919 withheld | The breakdown shows all three supported pools and puts pending under Core. |
| Shielded, wide | Core 0.45446003, Shielded 0.10, Platform 0.40 | Shielded 0.4960919 | The Shielded row reports the outstanding amount alongside 0.10 spendable. |
