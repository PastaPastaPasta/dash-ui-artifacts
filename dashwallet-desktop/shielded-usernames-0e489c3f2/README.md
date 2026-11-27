# Shielded username registration

The base is `fca6fa6b12f5e38b7c84b8d9e422972a213467cd` and the patched head is `0e489c3f2261cc5177b70ddce8e79a0475596680`.

Each revision was built separately and captured in Chromium at 1280 × 820 using disposable fixture data.
Home and Profile use the contested `alice` request and temporary label `alice2`. The names read fails in both revisions.
A failed attempt offers **Try again** on the patched head. A successful attempt explains that the temporary name is yours to keep.
Activity uses fixture row `sh-2`, rendered as a Shielded identity create. The fixture supplies the refusal field each engine revision returns for the proved-unsent case.

| State | Before at `fca6fa6b1` | After at `0e489c3f2` |
| --- | --- | --- |
| Home with a refused instant username, light | ![Home with a refused instant username, light, fca6fa6b1](before/home-dashpay-instant-failed-light.png) | ![Home with a refused instant username, light, 0e489c3f2](after/home-dashpay-instant-failed-light.png) |
| Home with a refused instant username, dark | ![Home with a refused instant username, dark, fca6fa6b1](before/home-dashpay-instant-failed-dark.png) | ![Home with a refused instant username, dark, 0e489c3f2](after/home-dashpay-instant-failed-dark.png) |
| Home with a registered instant username, light | ![Home with a registered instant username, light, fca6fa6b1](before/home-dashpay-instant-ok-light.png) | ![Home with a registered instant username, light, 0e489c3f2](after/home-dashpay-instant-ok-light.png) |
| Home with a registered instant username, dark | ![Home with a registered instant username, dark, fca6fa6b1](before/home-dashpay-instant-ok-dark.png) | ![Home with a registered instant username, dark, 0e489c3f2](after/home-dashpay-instant-ok-dark.png) |
| Profile request details with a refused instant username, light | ![Profile request details with a refused instant username, light, fca6fa6b1](before/profile-dashpay-instant-failed-light.png) | ![Profile request details with a refused instant username, light, 0e489c3f2](after/profile-dashpay-instant-failed-light.png) |
| Profile request details with a refused instant username, dark | ![Profile request details with a refused instant username, dark, fca6fa6b1](before/profile-dashpay-instant-failed-dark.png) | ![Profile request details with a refused instant username, dark, 0e489c3f2](after/profile-dashpay-instant-failed-dark.png) |
| Profile request details with a registered instant username, light | ![Profile request details with a registered instant username, light, fca6fa6b1](before/profile-dashpay-instant-ok-light.png) | ![Profile request details with a registered instant username, light, 0e489c3f2](after/profile-dashpay-instant-ok-light.png) |
| Profile request details with a registered instant username, dark | ![Profile request details with a registered instant username, dark, fca6fa6b1](before/profile-dashpay-instant-ok-dark.png) | ![Profile request details with a registered instant username, dark, 0e489c3f2](after/profile-dashpay-instant-ok-dark.png) |
| Activity details for a refused Shielded registration, light | ![Activity details for a refused Shielded registration, light, fca6fa6b1](before/activity-registration-release-light.png) | ![Activity details for a refused Shielded registration, light, 0e489c3f2](after/activity-registration-release-light.png) |
| Activity details for a refused Shielded registration, dark | ![Activity details for a refused Shielded registration, dark, fca6fa6b1](before/activity-registration-release-dark.png) | ![Activity details for a refused Shielded registration, dark, 0e489c3f2](after/activity-registration-release-dark.png) |
