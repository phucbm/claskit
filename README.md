# claskit

**Website:** https://claskit.phucbm.com

Autonomous Claude Code task runner. Write task specs as Markdown, run `claskit`, watch Claude implement them.

```
  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │   .claude/tasks/todo/           .claude/tasks/done/             │
  │   ┌──────────────────┐          ┌──────────────────┐            │
  │   │  feature-a.md    │          │  feature-a.md    │            │
  │   │  feature-b.md    │          │                  │            │
  │   └────────┬─────────┘          └────────▲─────────┘            │
  │            │                             │                      │
  │            ▼                             │                      │
  │      ┌───────────┐                       │                      │
  │      │  claskit  │                       │                      │
  │      └─────┬─────┘                       │                      │
  │            │                             │                      │
  │     ┌──────┴──────┐                      │                      │
  │     │             │                      │                      │
  │  --now       --schedule              implements                 │
  │     │        HH:MM ⏳                    │                      │
  │     │             │                      │                      │
  │     └──────┬───────┘                     │                      │
  │            ▼                             │                      │
  │   claude --dangerously-skip-permissions  │                      │
  │   reads spec → verifies → ──────────────┘                       │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘
```

## Requirements

- Node.js 18+
- [Claude Code CLI](https://claude.ai/code) installed and authenticated

## Install

```bash
pnpm add -g claskit
```

## Quick start

```bash
pnpm add -g claskit
```

```bash
claskit
```

claskit detects if the project is not set up and walks you through initialization interactively.

## Usage

```
claskit [flag]
```

| Flag | What it does |
|------|-------------|
| _(none)_ | Interactive menu: pick tasks, choose when to run |
| `--init` | Set up `.claude/tasks/` folder structure in current project |
| `--now` | Skip menu, run immediately (still shows task picker + confirm) |
| `--test` | Create 2 sample task files in `todo/` to test the runner |
| `--clean-test` | Remove all test-generated files |

### Interactive menu options

- **Now** — pick tasks and launch immediately
- **Schedule (HH:MM)** — live countdown until target time, then launch; machine sleep is prevented for the entire session (countdown + Claude runtime) on macOS/Linux via `caffeinate`
- **Exit**

### Task picker

When 2+ tasks are queued, claskit asks which to run:

```
Select tasks:
  Enter numbers separated by commas, or "all"
  [all]: 1,3
```

## How it works

1. Claude reads each selected `.md` spec
2. Decides execution order based on dependencies noted in specs
3. Implements each task fully
4. Verifies acceptance criteria
5. Moves the spec from `todo/` to `done/` on success
6. Stops and reports if anything fails

Claude runs with `--dangerously-skip-permissions` — it will read, write, and execute commands without prompting. Only use in projects you trust.

## Task spec format

```markdown
# Feature Title

## Task

What needs to be built.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Files Affected

| File | Change |
|------|--------|
| `src/foo.ts` | New component |

## Notes

Dependencies, order hints, constraints.
```

Save as `.claude/tasks/todo/my-feature.md`.

## Project integration

```bash
npm pkg set scripts.claskit="claskit"
```

Then run with `npm run claskit` / `pnpm claskit` / `yarn claskit`.

## License

MIT
