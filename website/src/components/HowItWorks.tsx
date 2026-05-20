import { en } from '../locales/en'
import { TerminalPanel } from './TerminalPanel'

const t = en.howItWorks

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b-2 border-ink">
      <div className="container py-[72px]">
        <div className="mb-10">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
            {t.sectionLabel}
          </span>
        </div>
      </div>

      {t.steps.map((step, i) => {
        const isEven = i % 2 === 1
        const isDark = isEven

        return (
          <div
            key={step.number}
            className="border-t border-ink"
            style={{ background: isDark ? '#0A0A0A' : '#f0f0f0' }}
          >
            <div className="container py-[56px]">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                  isEven ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Text */}
                <div className={isEven ? 'md:col-start-2' : ''}>
                  <div
                    className="font-display leading-none mb-4"
                    style={{
                      fontSize: '72px',
                      color: '#ea6049',
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-[24px] font-display mb-3"
                    style={{ color: isDark ? '#F2F0EB' : '#0A0A0A' }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Terminal */}
                <div
                  className={isEven ? 'md:col-start-1 md:row-start-1' : ''}
                  style={{
                    boxShadow: '4px 4px 0 #ea6049',
                    borderRadius: '8px',
                  }}
                >
                  <TerminalPanel
                    lines={step.terminal}
                    title={step.title}
                    delay={i * 100}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
