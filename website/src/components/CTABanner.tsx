import { useState } from 'react'
import { GITHUB } from '../constants'
import { en } from '../locales/en'

const t = en.cta

export function CTABanner() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('npm install -g claskit')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const headlineLines = t.headline.split('\n')

  return (
    <section className="bg-primary border-b-2 border-ink py-[80px]">
      <div className="container text-center">
        <h2
          className="font-display text-paper leading-[0.9] mb-6"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        <p className="font-mono text-[13px] text-paper/80 mb-10 max-w-[440px] mx-auto leading-relaxed">
          {t.sub}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={copy}
            className="font-mono text-[12px] font-bold tracking-[0.06em] bg-paper text-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors duration-100 copy-btn"
          >
            {copied ? '✓ copied!' : t.ctaInstall}
          </button>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[12px] font-bold tracking-[0.06em] border-2 border-paper text-paper px-6 py-3 hover:bg-paper hover:text-ink transition-colors duration-100"
          >
            {t.ctaGithub} ↗
          </a>
        </div>
      </div>
    </section>
  )
}
