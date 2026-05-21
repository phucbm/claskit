# Fix: scheduleRun flow order and invalid-input retry

**Status:** Planned

## Task

Fix `scheduleRun` in `bin/claskit.js` to follow the correct interaction order and retry on invalid input instead of exiting.

## Changes

### 1. Reorder flow in `scheduleRun`

Current (broken):
1. pickTasks
2. confirmLaunch  ← wrong position
3. ask time
4. validate → exit(1) on error  ← exits instead of retry

Correct order:
1. pickTasks
2. ask time (with retry loop on invalid input)
3. confirmLaunch
4. countdown → launchClaude

### 2. Retry on invalid time input

Replace `exit(1)` after invalid time with a loop that re-prompts until valid HH:MM entered.

## Acceptance Criteria

- [ ] Running `claskit` → Schedule → shows task picker first
- [ ] After task selection → prompts for time (HH:MM)
- [ ] Invalid time input → shows error and re-prompts (does NOT exit)
- [ ] Valid time → shows confirm prompt
- [ ] Confirm → starts countdown
- [ ] All existing behavior unchanged for `--now` path

## Files Affected

- `bin/claskit.js` — `scheduleRun` function only

## Notes

Do not change `launchReal` or any other function. Minimal, targeted fix.
