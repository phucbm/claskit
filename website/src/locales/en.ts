export const en = {
  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    faq: 'FAQ',
    install: 'npm install -g claskit',
  },
  hero: {
    headline: 'Claude works\nwhile you sleep.',
    sub: 'claskit schedules autonomous Claude Code runs from Markdown task specs. Session running out? Set a time, walk away. Come back to finished tasks.',
    badgeNode: 'Node 18+',
    badgeDeps: 'Zero deps',
    badgeLicense: 'MIT',
    badgeNpm: 'npm',
    ctaInstall: 'npm install -g claskit',
    ctaGithub: 'View on GitHub',
  },
  features: {
    sectionLabel: 'Features',
    items: [
      {
        id: '01',
        title: 'Schedule for later',
        body: 'Session about to end? Pick a time. claskit waits, keeps your Mac awake, and fires Claude exactly when you say.',
      },
      {
        id: '02',
        title: 'Spec-driven tasks',
        body: 'Write what needs doing in Markdown. claskit reads it, Claude implements it. No prompting, no hand-holding.',
      },
      {
        id: '03',
        title: 'Zero permission prompts',
        body: 'Runs with --dangerously-skip-permissions. Claude works autonomously start to finish.',
      },
      {
        id: '04',
        title: 'Acceptance criteria',
        body: 'Claude verifies checkboxes before marking a task done. No partial completions.',
      },
      {
        id: '05',
        title: 'Dependency-aware',
        body: 'Claude reads task notes and figures out order. No manual sequencing needed.',
      },
      {
        id: '06',
        title: 'Graceful failure',
        body: 'Stops on first error. Reports what broke. Nothing gets silently half-done.',
      },
    ],
  },
  howItWorks: {
    sectionLabel: 'How it works',
    steps: [
      {
        number: '01',
        title: 'Install',
        terminal: [
          '$ npm install -g claskit',
          '',
          '$ claskit --init',
          '  ✓ Created .claude/tasks/todo/',
          '  ✓ Created .claude/tasks/done/',
          '  Add sample tasks? [y/n]: y',
          '  ✓ 2 sample tasks created',
        ],
      },
      {
        number: '02',
        title: 'Write a task spec',
        terminal: [
          '.claude/tasks/todo/refactor-api.md',
          '─────────────────────────────────────',
          '# Refactor API client',
          '',
          '## Task',
          'Split the monolithic api.ts into',
          'separate modules per endpoint.',
          '',
          '## Acceptance Criteria',
          '- [ ] Each endpoint in its own file',
          '- [ ] Original api.ts re-exports all',
          '- [ ] All existing tests pass',
        ],
      },
      {
        number: '03',
        title: 'Schedule and walk away',
        terminal: [
          '$ claskit',
          '  Found 1 task.',
          '  Run now or schedule? [now/HH:MM]: 23:00',
          '',
          '  ⏰ Scheduled for 23:00',
          '  💡 caffeinate active — Mac stays awake',
          '  Press Ctrl+C to cancel.',
          '',
          '  ... (2h 14m later) ...',
          '  ► Launching Claude...',
          '  ✓ refactor-api.md → done/',
        ],
      },
    ],
  },
  faq: {
    sectionLabel: 'FAQ',
    items: [
      {
        q: 'Does this work with Codex or other AI tools?',
        a: 'No — currently optimized for Claude Code. Want to use it with your tool? Open an issue or fork it and vibe-code your own version.',
        links: [{ text: 'Open an issue', href: 'https://github.com/phucbm/claskit/issues' }],
      },
      {
        q: 'Is --dangerously-skip-permissions actually dangerous?',
        a: 'Depends on your workflow and how well you know Claude. This article explains it better than we can.',
        links: [{ text: 'This article', href: 'https://www.ksred.com/claude-code-dangerously-skip-permissions-when-to-use-it-and-when-you-absolutely-shouldnt/' }],
      },
      {
        q: 'How is this different from just using Claude Code directly?',
        a: 'claskit queues multiple tasks, schedules runs for a specific time, prevents Mac sleep, and verifies acceptance criteria. Less babysitting.',
        links: [],
      },
      {
        q: 'What if my Claude usage runs out mid-run?',
        a: 'Ever heard of 9router? That might be your answer — lets Claude Code run with other models too.',
        links: [{ text: '9router', href: 'https://9router.com/' }],
      },
      {
        q: 'Do I need a Claude subscription?',
        a: 'Normally yes — but with 9router you can run Claude Code with free or cheaper models. claskit just triggers your Claude Code session; we don\'t add system prompts or send anything from your machine. How Claude runs is identical to your manual runs.',
        links: [{ text: '9router', href: 'https://9router.com/' }],
      },
    ],
  },
  cta: {
    headline: 'Your session ends.\nThe work doesn\'t.',
    sub: 'Schedule a claskit run before you close the laptop. Wake up to finished tasks.',
    ctaInstall: 'npm install -g claskit',
    ctaGithub: 'GitHub',
  },
  footer: {
    license: 'MIT License',
    by: 'claskit by phucbm',
    npm: 'npm',
    github: 'GitHub',
  },
}

export type Translations = typeof en
