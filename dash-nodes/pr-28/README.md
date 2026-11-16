# dash-nodes #28: evonode rank section

- Before: base `c4869863257c50a78e3924a1b5736b1750282352` (main)
- After: PR head `502f410e56559153c415c72a3b9b7cd480dedfac` (replaces the first version's shots of `803c77a`, which didn't show ties)
- Page: `/mn/144d21600eb7f37203cebef3ac5c5d4faa6063d9178edf746f838a2440fbb428` (mainnet), section `.rewards-where`
- Each revision's `web/` was served locally with `/api/v1` proxied to radar.dashhq.org. Both were captured back to back on 2026-11-16 at about 04:44 UTC from the same live data, in headless Chrome at 2× scale, at desktop (1280 px) and phone (390 px) width, in light and dark themes.
- The figures on the after shots (57 and 68) match counts from the API: 203 and 242 of the 351 enabled evonodes earned less.
- The after shots were retaken at about 04:55 UTC; the figures (203 and 242 of 351, with 26 tied last epoch) were unchanged.
