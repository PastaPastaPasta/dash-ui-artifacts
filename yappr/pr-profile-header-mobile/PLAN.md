# QA78 profile header actions

| Surface | Before | After | Shared fixture | Expected visible change |
|---|---|---|---|---|
| Own edit, 320px | 733faf53cd893cba861476a4af75b442ed67ca72 | committed fix/profile-header-mobile-actions, full hash recorded before capture | persona55, Rosa Yamamoto; light theme, Chromium,320x844 | Save fits within viewport beside avatar, wrapped action rows |
| Other profile,320px | same | same | viewer55, profile57; no writes | Header controls wrap within available width |
| Own read/edit/cancel,390/1280px | same | same | same persona55, unchanged profile | Compatibility measurements; screenshot if materially different |

Actual production builds, fresh browser sessions. Session helper seeds reserved QA identity; not login evidence. No CSS/DOM injection in final captures. Initial CSS experiment under /tmp/yappr-profile-header-qa is diagnostic only and must not be published as after evidence. Form edits will be canceled, no profile persistence claim. Capture after loading and toast dismissal, top scroll, comparable frames. Inspect every final PNG at original resolution and verify immutable published bytes/type/hash plus rendered PR.

Final compared head: `29f8abe2305a0b53c5f3d549c761e2072f45c0aa`.
