# QA94 evidence matrix

| Surface | Before | After | Shared fixture | Expected visible change |
|---|---|---|---|---|
| Requester viewing owner's profile | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | 75863edf38d589f347b080f5496405c9d3133564 | Requester38 4epjp48EuEG7UetQ7uExDsYNsoWLeVWU9Ym26sXb64WM; owner39 9NFhqxW8upkFMVTE5h5VmYWLdSEJ26B2iMKdhCFgsWkd; same retained requester-owned request from earlier approve/revoke QA, no grant, owner epoch2; ordinary Follow restored through normal UI | Before Revoked has no cancellation action. After Pending opens Cancel. |
| Owner's request list, after requester cancellation | Same retained request | Same head after normal Cancel | Owner39 unchanged feed and keys | Pending request disappears after reload; no private follower granted. |

Independent production devnet builds, frozen base3288 and head3298, same static export mapping. Fresh Chromium contexts with normal key2 WIF sign-in; light theme, en-US, America/Chicago, scale1. Desktop1440×1200 and mobile390×844. No direct service calls, data injection, private access attempts, or feed resets. Original request is preserved until all before/head images are inspected. Only then cancel it, test a fresh pending request, cancel that, and remove the temporary ordinary follow. Relative post/request ages may advance with elapsed real time; no clock alteration. Any unrelated differences are disclosed. Credentials never appear in captures or artifacts.

Mobile limitation discovered during capture: the profile action row overflows390px on both revisions (488px before,499px pending after). Unscrolled mobile frames preserve that observation. Additional mobile-status captures horizontally scroll to the control using the normal page scroll, allowing status comparison without hiding the existing layout defect. Desktop is the primary cancellation proof.
