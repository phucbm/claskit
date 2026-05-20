import type { ReactNode } from 'react'

const faqItems = [
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
    a: "Normally yes — but with 9router you can run Claude Code with free or cheaper models. claskit just triggers your Claude Code session; we don't add system prompts or send anything from your machine. How Claude runs is identical to your manual runs.",
    links: [{ text: '9router', href: 'https://9router.com/' }],
  },
]

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
            FAQ
          </span>
        </div>

        <div className="border-t border-ink">
          {faqItems.map((item, i) => (
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
