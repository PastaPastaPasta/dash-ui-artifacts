# PR479 restack evidence

Before exact parent #476 `8147051bbc55e63b4fbbb2f0c3725846a349858c`. After full head `562e76009b448fd4c4ce85b7df5f1bf57c9a76c1`.

| Surface | Before | After | Fixture | Delta |
| --- | --- | --- | --- | --- |
|390px unread All | One-row overflow | Two rows fit | Persona39 actual notifications | All controls fit |
|320px unread Mentions | Gear/filter clip | Two rows fit | Same notifications | Narrow layout |
|Read Mentions and desktop | Existing behavior | Fit and preserve read state | Normal mark-all and reload | Compatibility |
|Settings keyboard focus | Named tooltip link | Same named tooltip link in mobile first row | Same persona/browser | Inherited accessible behavior retained |

Fresh normal login per revision; no data mocks/storage injection. Two real devnet notifications, independent exact builds, static adapter.
