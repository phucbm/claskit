import { useState } from 'react'
import { GITHUB, VERSION } from '../constants'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('npm install -g claskit')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b-2 border-ink h-14 flex items-center">
      <div className="container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 font-display text-[18px] text-ink leading-none">
            <img src="/icon.png" alt="claskit" className="w-7 h-7 rounded-md" />
            claskit
          </a>
          <span className="text-[10px] font-mono font-bold tracking-[0.12em] bg-ink text-paper px-1.5 py-0.5">
            v{VERSION}
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0">
          {[
            { label: 'Features', href: '#features' },
            { label: 'How it works', href: '#how-it-works' },
            { label: 'FAQ', href: '#faq' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[11px] font-bold tracking-[0.1em] uppercase px-4 border-l border-ink/20 hover:text-primary transition-colors duration-100"
            >
              {label}
            </a>
          ))}
          <button
            onClick={copy}
            className="ml-4 border-l border-ink/20 pl-4 text-[11px] font-bold tracking-[0.08em] bg-ink text-paper px-3 py-1.5 hover:bg-primary transition-colors duration-100 copy-btn"
          >
            {copied ? '✓ copied' : 'npm install -g claskit'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger md:hidden flex flex-col gap-[5px] p-2 ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-ink"></span>
          <span className="block w-5 h-0.5 bg-ink"></span>
          <span className="block w-5 h-0.5 bg-ink"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-paper border-b-2 border-ink md:hidden z-40">
          <div className="container py-4 flex flex-col gap-3">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How it works', href: '#how-it-works' },
              { label: 'FAQ', href: '#faq' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-[12px] font-bold tracking-[0.1em] uppercase py-1"
              >
                {label}
              </a>
            ))}
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="text-[12px] font-bold tracking-[0.1em] uppercase py-1 text-primary"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
