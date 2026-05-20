import { useState } from 'react'
import { GITHUB } from '../constants'
import { TerminalPanel } from './TerminalPanel'

const HERO_LINES = [
  '$ claskit',
  '',
  '  claskit v1.0.1',
  '  Found 2 tasks in .claude/tasks/todo/',
  '',
  '  [1] Refactor API client',
  '  [2] Write unit tests for auth module',
  '',
  '  Select tasks (1,2,3 or "all"): all',
  '  Run now or schedule? [now/HH:MM]: 23:00',
  '',
  '  ⏰ Scheduled for 23:00 (2h 14m from now)',
  '  💡 Keeping Mac awake with caffeinate...',
  '  Go get some rest. Claude\'s got this.',
]

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('npm install -g claskit')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="hero" className="border-b-2 border-ink py-[60px] lg:py-[80px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-7">
            <h1
              className="font-display text-ink leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(52px, 5vw, 108px)' }}
            >
              <span className="block">Claude awake</span>
              <span className="block">while you're away.</span>
            </h1>

            <p
              className="font-mono text-[14px] text-muted leading-relaxed mb-8 max-w-[480px]"
            >
              claskit schedules autonomous Claude Code runs from Markdown task specs. Session running out? Set a time, walk away. Come back to finished tasks.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Node 18+', 'Zero deps', 'MIT', 'npm'].map(b => (
                <span
                  key={b}
                  className="text-[10px] font-bold tracking-[0.12em] uppercase border border-ink px-2 py-1"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copy}
                className="font-mono text-[12px] font-bold tracking-[0.06em] bg-ink text-paper px-5 py-3 hover:bg-primary transition-colors duration-100 copy-btn"
              >
                {copied ? '✓ copied!' : 'npm install -g claskit'}
              </button>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] font-bold tracking-[0.06em] border-2 border-ink px-5 py-3 hover:bg-ink hover:text-paper transition-colors duration-100"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>

          {/* Terminal mockup */}
          <div className="lg:col-span-5">
            <TerminalPanel
              lines={HERO_LINES}
              title="claskit — Terminal"
              showCursor
            />
          </div>
        </div>
      </div>
    </section>
  )
}
