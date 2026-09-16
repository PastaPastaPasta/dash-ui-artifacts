# QA131 code-simplifier

Inspected actual four-file diff against cf0efbc1.

Candidates considered:
- Separate reusable interactive-hover abstraction: rejected; only one consumer and dedicated profile behavior, extra context/prop plumbing would add complexity.
- Multiple open/close timers: already consolidated into one ref and one cleanup function.
- Merge keyboard-entry and return-focus flags: rejected; they represent distinct transitions (deferred mount focus versus suppressing Escape reopen).
- Retain obsolete HoverCard wrapper/dependency: removed both, including only its now-unused nested lockfile dependencies.

Changes applied: unused components/ui/hover-card.tsx and @radix-ui/react-hover-card removed; no additional source refactor improves complexity safely. Existing profile loading/follow logic remains local and unchanged.

Behavioral safety: pointer-only preview does not focus; explicit ArrowDown enters standard Popover focus scope; Escape returns original trigger; original child primary navigation remains intact. No custom Tab-order algorithm was added; Popover cycles controls and its visible Escape instruction explains exit.

Validation: target lint, full TypeScript, first production devnet build, real browser keyboard/pointer lifecycle pass. Final committed-build verification and independent review still pending.
