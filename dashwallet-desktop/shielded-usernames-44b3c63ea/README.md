# Shielded username registration

The base is `HEAD^^2` and the patched head is `44b3c63ea7bab227a65c8119fb3e1cfe15679488`.

Each revision was built separately and captured in Chromium at 1280 × 820 using disposable fixture data.
Home and Profile use the contested `alice` request and temporary label `alice2`. The names read fails in both revisions.
A failed attempt offers **Try again** on the patched head. A successful attempt explains that the temporary name is yours to keep.
Activity uses fixture row `sh-2`, rendered as a Shielded identity create. The fixture supplies the refusal field each engine revision returns for the proved-unsent case.

| State | Before at `HEAD^^2` | After at `44b3c63ea` |
| --- | --- | --- |
| Home with a refused instant username, light | ![Home with a refused instant username, light, HEAD^^2](before/home-dashpay-instant-failed-light.png) | ![Home with a refused instant username, light, 44b3c63ea](after/home-dashpay-instant-failed-light.png) |
| Home with a refused instant username, dark | ![Home with a refused instant username, dark, HEAD^^2](before/home-dashpay-instant-failed-dark.png) | ![Home with a refused instant username, dark, 44b3c63ea](after/home-dashpay-instant-failed-dark.png) |
| Home with a registered instant username, light | ![Home with a registered instant username, light, HEAD^^2](before/home-dashpay-instant-ok-light.png) | ![Home with a registered instant username, light, 44b3c63ea](after/home-dashpay-instant-ok-light.png) |
| Home with a registered instant username, dark | ![Home with a registered instant username, dark, HEAD^^2](before/home-dashpay-instant-ok-dark.png) | ![Home with a registered instant username, dark, 44b3c63ea](after/home-dashpay-instant-ok-dark.png) |
| Profile request details with a refused instant username, light | ![Profile request details with a refused instant username, light, HEAD^^2](before/profile-dashpay-instant-failed-light.png) | ![Profile request details with a refused instant username, light, 44b3c63ea](after/profile-dashpay-instant-failed-light.png) |
| Profile request details with a refused instant username, dark | ![Profile request details with a refused instant username, dark, HEAD^^2](before/profile-dashpay-instant-failed-dark.png) | ![Profile request details with a refused instant username, dark, 44b3c63ea](after/profile-dashpay-instant-failed-dark.png) |
| Profile request details with a registered instant username, light | ![Profile request details with a registered instant username, light, HEAD^^2](before/profile-dashpay-instant-ok-light.png) | ![Profile request details with a registered instant username, light, 44b3c63ea](after/profile-dashpay-instant-ok-light.png) |
| Profile request details with a registered instant username, dark | ![Profile request details with a registered instant username, dark, HEAD^^2](before/profile-dashpay-instant-ok-dark.png) | ![Profile request details with a registered instant username, dark, 44b3c63ea](after/profile-dashpay-instant-ok-dark.png) |
| Activity details for a refused Shielded registration, light | ![Activity details for a refused Shielded registration, light, HEAD^^2](before/activity-registration-release-light.png) | ![Activity details for a refused Shielded registration, light, 44b3c63ea](after/activity-registration-release-light.png) |
| Activity details for a refused Shielded registration, dark | ![Activity details for a refused Shielded registration, dark, HEAD^^2](before/activity-registration-release-dark.png) | ![Activity details for a refused Shielded registration, dark, 44b3c63ea](after/activity-registration-release-dark.png) |
| home with a transferred instant username, light | ![Before](before/home-dashpay-instant-transferred-light.png) | ![After](after/home-dashpay-instant-transferred-light.png) |
| home with a transferred instant username, dark | ![Before](before/home-dashpay-instant-transferred-dark.png) | ![After](after/home-dashpay-instant-transferred-dark.png) |
| profile with a transferred instant username, light | ![Before](before/profile-dashpay-instant-transferred-light.png) | ![After](after/profile-dashpay-instant-transferred-light.png) |
| profile with a transferred instant username, dark | ![Before](before/profile-dashpay-instant-transferred-dark.png) | ![After](after/profile-dashpay-instant-transferred-dark.png) |
