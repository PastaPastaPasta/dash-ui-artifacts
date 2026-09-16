# QA103 sign-in keyboard focus and dismissal

Before exact staging: `cf0efbc10b8757137063113ebbd2061e8b87d8f7`; after signed head: `d0a3832dc834a4e7ca8961854cf241dd69f9317f`. Independent committed devnet builds on3288/3313. Fresh guest browser contexts; no credentials or login submissions.

| Surface | Shared ordinary sequence | Before defect | After expected |
|---|---|---|---|
| Poll sign-in prompt | Existing post `A97wUuDzx6uxJAKKxicTJZHrhL4huq8w58uiSXZM7tHa`; focus Sign in to vote and press Enter, then Escape | Focus remains on background trigger, dialog remains | Focus begins inside, Escape closes and returns to trigger |
| Sign-in keyboard navigation | Open from same guest poll; press Tab/Shift+Tab repeatedly | Focus can leave modal | Focus remains inside modal |

Record actual online prompt focus/QR-presence checks without copying transient pairing payload. Mask the ephemeral pairing QR tile with a solid gray rectangle at capture time; this is the only image redaction and does not cover focus, dialog controls, or poll content. Disclose the mask in captions. The controlled-offline probe still generated a local QR and is not used as published evidence. Images at1280×900/light;390px/reduced-motion and sidebar, Close, backdrop, advanced empty form, focus return are compatibility assertions, not fabricated visible deltas. No votes or credentials submitted.
