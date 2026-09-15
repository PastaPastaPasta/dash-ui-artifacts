# Yappr #442 — Settings Back control name

Before — exact staging base `4105c5d1c914f5d0838619da93c3b8d28b4a780e`.
After — full PR head `f2f72aa2691845a4a4d8ea8184f6b0eb056eef03`.
Both independently built with `npm run build:devnet`; separate output directories and fresh independent authenticated Chromium contexts. Source tree remained clean after the signed commit; staging was checked to remain at the stated base.

Same existing persona44 `soren-notes7.dash`, identity `4WJqx5yBKTW3v6FbkvwNZpGvWyafDzTjMSZLZEYwtC8R`. Viewport1280×1100, scale1, light theme, en-US, America/Chicago. Auth fixture initialized the local session only; key remained in memory and never appeared in any input or screenshot. No product DOM or requests mocked. All input fields stayed empty. Unrelated asynchronous sidebar loading/counts can vary in full context; no claim depends on them.

## Evidence matrix and gesture

| Before state | After state | Shared fixture / visible delta |
| --- | --- | --- |
| Exact staging base | Full committed PR head | Same Appearance page opened from Settings; focus Back → visible tooltip only after. |

Open Appearance from the Settings menu, then focus the Back arrow. Before it has no name or tooltip; after it exposes **Back** and displays the tooltip.

### Appearance

| Before — exact base | After — full head |
| --- | --- |
| ![Before appearance](comparison/before/appearance.png) | ![After appearance](comparison/after/appearance.png) |

[Full context before](comparison/before/appearance-context.png) · [full context after](comparison/after/appearance-context.png).

## Validation

The fixed button has accessible name Back. On both revisions pressing Enter on the button returns to the prior Settings menu, preserving browser history navigation.

[Actual browser AX measurements before](before-measurements.json) · [after and interaction checks](after-measurements.json). Accessibility semantics are measured from Chromium; screenshots show actual product gestures. Matching crops preserve native resolution: x275 y0 w654 h300. Every final focused and context PNG was opened and visually inspected before publication.

Targeted ESLint, standalone TypeScript, production devnet build, and independent source review passed. No cryptographic, network, data or submission behavior was changed.

## SHA-256

- `bbc1700d8f097c942a60c7384bb3a1c9de0418cbe16e35baaea3cf5f65b4add4` — `after-measurements.json`
- `48c4ec399774d2ec272abd94326985e66bdefcf02839a66393d972c95b169826` — `before-measurements.json`
- `bdb5619b01df0e487717660c3fe4e19232fe3a0b4e87009817052dd104de8c38` — `comparison/after/appearance-context.png`
- `a25b095c6a309dad50bd184408f6406152481fde43779030c93d7958a69965f5` — `comparison/after/appearance.png`
- `f2295b7f9aef77f78e4a9d0d78cdb8602389259eb30489c2e2eef25f1ac1ab56` — `comparison/before/appearance-context.png`
- `3679d9a19b54672c70951939be0a4b0b1e2041182ca8602f7a2792544bbdfd31` — `comparison/before/appearance.png`
