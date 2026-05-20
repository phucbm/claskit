import type { ReactNode } from 'react'
import { en } from '../locales/en'

const t = en.faq

function linkify(text: string, links: { text: string; href: string }[]): ReactNode {
  if (!links.length) return text
  const parts: (string | ReactNode)[] = []
  let remaining = text

  links.forEach((link, li) => {
    const idx = remaining.indexOf(link.text)
    if (idx === -1) return
    parts.push(remaining.slice(0, idx))
    parts.push(
      <a
        key={li}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-primary transition-colors duration-100"
      >
        {link.text}
      </a>
    )
    remaining = remaining.slice(idx + link.text.length)
  })
  parts.push(remaining)
  return parts
}

export function FAQ() {
  return (
    <section id="faq" className="border-b-2 border-ink py-[72px]">
      <div className="container">
        <div className="mb-8">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
            {t.sectionLabel}
          </span>
        </div>

        <div className="border-t border-ink">
          {t.items.map((item, i) => (
            <div key={i} className="faq-row">
              <div className="text-[12px] font-bold font-mono text-ink">
                <span className="text-primary mr-1">Q.</span>
                {item.q}
              </div>
              <div className="text-[13px] font-mono text-muted leading-relaxed">
                {linkify(item.a, item.links)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
