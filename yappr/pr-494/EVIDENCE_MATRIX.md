# QA91 evidence matrix

| Surface | Before | After | Shared fixture | Visible delta |
|---|---|---|---|---|
| My Blogs after Create Blog keyboard Escape | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | b859758af3926c76fba47a5dd149ff30ce8b7a5c | QA persona39 9NFhqxW8upkFMVTE5h5VmYWLdSEJ26B2iMKdhCFgsWkd, normal fresh WIF login, blank form, no own blogs or create writes | Before focus falls to BODY and no focus ring. After focus returns to original Create Blog and Enter reopens without refocusing. |

Independent production devnet builds on matching static servers, frozen base3288 and head3295. Fresh Chromium contexts,1440×1200, device scale1, en-US, America/Chicago, light theme. Normal UI actions only; no DOM/network/auth injection. Screenshot guard rejects populated credential/password fields. Open form context plus closed full overview and unmodified header crop; no invented visual changes to the open form. Additional procedural checks cover Cancel, close X, overlay, Tab containment, and mobile390/320 Escape focus return. Mobile form overflow is independently tracked as QA87; this fix does not change layout.
