Surface: Create Blog dialog at320x700,700x320,1280x900.
Before cf0efbc10b8757137063113ebbd2061e8b87d8f7 server3288.
After ba8a6331ef6f3344435689a8372a12e0f2c1c675 server3319 (root public assets served consistently with baseline).
Shared fixture persona64, fresh empty unsaved dialog, same live existing2blogs/1article. No network writes.
Claim: before fixed dialog overflows viewport and wheel cannot reveal controls; after capped dialog scrolls internally and top/footer controls remain reachable. Desktop ordinary layout should remain unchanged. Keyboardfocus return separatelyQA91 and intentionally unchanged.
