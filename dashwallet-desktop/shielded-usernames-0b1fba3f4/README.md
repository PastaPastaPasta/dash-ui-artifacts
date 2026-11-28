# Shielded username registration

The base is `2f230f1abd9736ca0c19a5844b9e098b2de65c16` and the patched head is `0b1fba3f4e417a54c7fdc237c95fedf7c852c76f`.

Each revision was built separately and captured in Chromium at 1280 × 820 using disposable fixture data.
Home and Profile use the contested `alice` request and temporary label `alice2`. The names read fails in both revisions.
A failed attempt offers **Try again**. A confirmed owner sees the success line. In the transfer fixture, the identity summary still lists `alice2` while DPNS reports a different owner. Home and Profile drop the stale username.
Activity uses fixture row `sh-2`, rendered as a Shielded identity create. The fixture supplies the refusal field each engine revision returns for the proved-unsent case.

| State | Before at `2f230f1ab` | After at `0b1fba3f4` |
| --- | --- | --- |
| Home with a refused instant username, light | ![Home with a refused instant username, light, 2f230f1ab](before/home-dashpay-instant-failed-light.png) | ![Home with a refused instant username, light, 0b1fba3f4](after/home-dashpay-instant-failed-light.png) |
| Home with a refused instant username, dark | ![Home with a refused instant username, dark, 2f230f1ab](before/home-dashpay-instant-failed-dark.png) | ![Home with a refused instant username, dark, 0b1fba3f4](after/home-dashpay-instant-failed-dark.png) |
| Home with a registered instant username, light | ![Home with a registered instant username, light, 2f230f1ab](before/home-dashpay-instant-ok-light.png) | ![Home with a registered instant username, light, 0b1fba3f4](after/home-dashpay-instant-ok-light.png) |
| Home with a registered instant username, dark | ![Home with a registered instant username, dark, 2f230f1ab](before/home-dashpay-instant-ok-dark.png) | ![Home with a registered instant username, dark, 0b1fba3f4](after/home-dashpay-instant-ok-dark.png) |
| Profile request details with a refused instant username, light | ![Profile request details with a refused instant username, light, 2f230f1ab](before/profile-dashpay-instant-failed-light.png) | ![Profile request details with a refused instant username, light, 0b1fba3f4](after/profile-dashpay-instant-failed-light.png) |
| Profile request details with a refused instant username, dark | ![Profile request details with a refused instant username, dark, 2f230f1ab](before/profile-dashpay-instant-failed-dark.png) | ![Profile request details with a refused instant username, dark, 0b1fba3f4](after/profile-dashpay-instant-failed-dark.png) |
| Profile request details with a registered instant username, light | ![Profile request details with a registered instant username, light, 2f230f1ab](before/profile-dashpay-instant-ok-light.png) | ![Profile request details with a registered instant username, light, 0b1fba3f4](after/profile-dashpay-instant-ok-light.png) |
| Profile request details with a registered instant username, dark | ![Profile request details with a registered instant username, dark, 2f230f1ab](before/profile-dashpay-instant-ok-dark.png) | ![Profile request details with a registered instant username, dark, 0b1fba3f4](after/profile-dashpay-instant-ok-dark.png) |
| Activity details for a refused Shielded registration, light | ![Activity details for a refused Shielded registration, light, 2f230f1ab](before/activity-registration-release-light.png) | ![Activity details for a refused Shielded registration, light, 0b1fba3f4](after/activity-registration-release-light.png) |
| Activity details for a refused Shielded registration, dark | ![Activity details for a refused Shielded registration, dark, 2f230f1ab](before/activity-registration-release-dark.png) | ![Activity details for a refused Shielded registration, dark, 0b1fba3f4](after/activity-registration-release-dark.png) |
| home with a transferred instant username, light | ![Before at 2f230f1ab](before/home-dashpay-instant-transferred-light.png) | ![After at 0b1fba3f4](after/home-dashpay-instant-transferred-light.png) |
| home with a transferred instant username, dark | ![Before at 2f230f1ab](before/home-dashpay-instant-transferred-dark.png) | ![After at 0b1fba3f4](after/home-dashpay-instant-transferred-dark.png) |
| profile with a transferred instant username, light | ![Before at 2f230f1ab](before/profile-dashpay-instant-transferred-light.png) | ![After at 0b1fba3f4](after/profile-dashpay-instant-transferred-light.png) |
| profile with a transferred instant username, dark | ![Before at 2f230f1ab](before/profile-dashpay-instant-transferred-dark.png) | ![After at 0b1fba3f4](after/profile-dashpay-instant-transferred-dark.png) |
