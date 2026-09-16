# QA131 evidence plan

Before: exact staging base cf0efbc10b8757137063113ebbd2061e8b87d8f7, independently built shared server3288.
After: final signed full head to be recorded before final capture, independently built server3374.
Shared ordinary live fixture: Tess Jansen, identity 7q9PdfjVLCZbcLb8wDdExUCokYSdi9Gu251Fqne2jNv9, current first original authored post from that profile. Use the same exact post ID for before/after, guest unless authenticated controls required. Fresh browser contexts, 1280×900 and390×844, Light theme. Seeded account76/77 only for ordinary follow/unfollow if necessary; never publish keys or login claims.

| Behavior | Before state | After state | Visible delta / verification |
|---|---|---|---|
| Keyboard entry | Focus profile avatar, ArrowDown thenTab skips card controls | Focus same avatar, visible instructions, ArrowDown enters controls thenTab reachesFollowing | PNG pair with actual focus ring + state JSON |
| Follow action focus | RepeatedTabs still skip action | ArrowDown then3Tabs focusesFollow | PNG pair with active-element trace |
| Mobile preview fit | Same card on390px | Dialog fits viewport with visible keyboard hint/actions | PNG pair |
| Pointer/normal navigation | Hover no autofocus, pointer profile navigation | Same preserved | Browser assertion only; no invented visual change |
| Lifecycle/loading | Loading before actions, Escape/dismiss | Sensible content focus, Escape return/no reopen, outside focus kept | Browser assertions, explicit delayed response only if used |
