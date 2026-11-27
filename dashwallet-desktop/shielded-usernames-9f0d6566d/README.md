# Shielded username registration

The base is `eebb848bd12b8a7e6fb56aef3b281a852fb880fc` and the patched head is `9f0d6566d0754f5ed9e0e1ccc381d4a26e898e55`.

Each revision was built separately and captured in Chromium at 1280 × 820 using disposable fixture data.
Home and Profile use the contested `alice` request and temporary label `alice2`. The names read fails in both revisions.
A failed attempt offers **Try again** on the patched head. A successful attempt explains that the temporary name is yours to keep.
Activity uses fixture row `sh-2`, rendered as a Shielded identity create. The fixture supplies the refusal field each engine revision returns for the proved-unsent case.

| State | Before at `eebb848bd` | After at `9f0d6566d` |
| --- | --- | --- |
| Home with a refused instant username, light | ![Home with a refused instant username, light, eebb848bd](before/home-dashpay-instant-failed-light.png) | ![Home with a refused instant username, light, 9f0d6566d](after/home-dashpay-instant-failed-light.png) |
| Home with a refused instant username, dark | ![Home with a refused instant username, dark, eebb848bd](before/home-dashpay-instant-failed-dark.png) | ![Home with a refused instant username, dark, 9f0d6566d](after/home-dashpay-instant-failed-dark.png) |
| Home with a registered instant username, light | ![Home with a registered instant username, light, eebb848bd](before/home-dashpay-instant-ok-light.png) | ![Home with a registered instant username, light, 9f0d6566d](after/home-dashpay-instant-ok-light.png) |
| Home with a registered instant username, dark | ![Home with a registered instant username, dark, eebb848bd](before/home-dashpay-instant-ok-dark.png) | ![Home with a registered instant username, dark, 9f0d6566d](after/home-dashpay-instant-ok-dark.png) |
| Profile request details with a refused instant username, light | ![Profile request details with a refused instant username, light, eebb848bd](before/profile-dashpay-instant-failed-light.png) | ![Profile request details with a refused instant username, light, 9f0d6566d](after/profile-dashpay-instant-failed-light.png) |
| Profile request details with a refused instant username, dark | ![Profile request details with a refused instant username, dark, eebb848bd](before/profile-dashpay-instant-failed-dark.png) | ![Profile request details with a refused instant username, dark, 9f0d6566d](after/profile-dashpay-instant-failed-dark.png) |
| Profile request details with a registered instant username, light | ![Profile request details with a registered instant username, light, eebb848bd](before/profile-dashpay-instant-ok-light.png) | ![Profile request details with a registered instant username, light, 9f0d6566d](after/profile-dashpay-instant-ok-light.png) |
| Profile request details with a registered instant username, dark | ![Profile request details with a registered instant username, dark, eebb848bd](before/profile-dashpay-instant-ok-dark.png) | ![Profile request details with a registered instant username, dark, 9f0d6566d](after/profile-dashpay-instant-ok-dark.png) |
| Activity details for a refused Shielded registration, light | ![Activity details for a refused Shielded registration, light, eebb848bd](before/activity-registration-release-light.png) | ![Activity details for a refused Shielded registration, light, 9f0d6566d](after/activity-registration-release-light.png) |
| Activity details for a refused Shielded registration, dark | ![Activity details for a refused Shielded registration, dark, eebb848bd](before/activity-registration-release-dark.png) | ![Activity details for a refused Shielded registration, dark, 9f0d6566d](after/activity-registration-release-dark.png) |
