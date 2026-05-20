import { GITHUB, NPM } from '../constants'

export function Footer() {
  return (
    <footer className="py-[22px] border-t border-ink/20">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-muted">
          MIT License · claskit by phucbm
        </span>
        <div className="flex items-center gap-0">
          <a
            href={NPM}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-muted border-l border-ink/20 pl-4 pr-4 hover:text-primary transition-colors duration-100"
          >
            npm ↗
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-muted border-l border-ink/20 pl-4 hover:text-primary transition-colors duration-100"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
