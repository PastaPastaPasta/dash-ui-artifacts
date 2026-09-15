| Surface / behavior | Before | After | Shared fixture | Visible delta |
|---|---|---|---|---|
| Name label click | Exact staging 4105c5d1c914f5d0838619da93c3b8d28b4a780e | Final committed PR head | persona34, unchanged profile, 1280×1000, light theme, scroll y200 | Before label click leaves input unfocused; after native focus ring appears on Name input |
| Bio label click | Same exact base | Same final head | Same profile and framing | Before label click leaves textarea unfocused; after native focus ring appears on Bio textarea |
| All five field accessible names | Empty or placeholder fallback | Name, Pronouns, Bio, Location, Website | Actual rendered form | Nonvisual assertion: accessible names match labels, labels focus their fields |

The screenshots come from the actual in-place editor against live devnet. No profile is saved. Programmatic storage setup restores an existing provisioned QA identity; network data and application UI are not mocked. The viewport keeps label and associated control visible. Global statistics outside the editor may change with live devnet activity. Assertions include all five label-click focus results and ARIA snapshots; screenshots show the two representative native focus changes.
