import { en } from '../locales/en'

const t = en.features

export function Features() {
  const items = t.items

  return (
    <section id="features" className="border-b-2 border-ink py-[72px]">
      <div className="container">
        <div className="mb-8">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
            {t.sectionLabel}
          </span>
        </div>

        <div className="border-2 border-ink grid grid-cols-1 md:grid-cols-2">
          {items.map((item, i) => {
            const isLastRow = i >= items.length - (items.length % 2 === 0 ? 2 : 1)
            const isRightCol = i % 2 === 1

            return (
              <div
                key={item.id}
                className="p-6 lg:p-8 group hover:bg-ink transition-colors duration-[120ms] cursor-default"
                style={{
                  borderBottom: isLastRow ? 'none' : '1px solid #0A0A0A',
                  borderRight: isRightCol ? 'none' : '1px solid #0A0A0A',
                }}
              >
                <div className="text-[11px] font-bold tracking-[0.12em] text-primary mb-3 group-hover:text-paper transition-colors duration-[120ms]">
                  [{item.id}]
                </div>
                <h3
                  className="text-[15px] font-display text-ink mb-2 group-hover:text-paper transition-colors duration-[120ms]"
                >
                  {item.title}
                </h3>
                <p
                  className="text-[12px] font-mono text-muted leading-relaxed group-hover:text-paper/70 transition-colors duration-[120ms]"
                >
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
