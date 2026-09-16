| Claim | Before | After | Shared fixture | Visible change |
|---|---|---|---|---|
| Filter can continue to a matching unloaded product | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | 030fd00978742eab3a8500262d1b7c287286b293 | buyer63,104-product storeCP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb, first100 loaded, searchtailmarker62 | Base says No matching products and has no continuation; head auto-loads and shows actualBatch101 |
Independent committed production devnet builds, unchanged static adapter, Chromium1280×1000, lighttheme. No writes, scoped auth is not freshlogin. Head-only ordinaryoffline snapshot shows qualified incomplete search text with continuation; restoreonline and actualread recovers. No response/DOM mocks.
