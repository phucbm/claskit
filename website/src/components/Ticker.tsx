const ITEMS = [
  'SCHEDULE IT',
  'ZERO PERMISSIONS',
  'SPEC-DRIVEN',
  'FREE',
  'MIT',
  'NODE 18+',
  'NO DEPS',
  'AUTONOMOUS',
  'CLAUDE CODE',
  'QUEUE TASKS',
  'ACCEPTANCE CRITERIA',
  'KEEPS MAC AWAKE',
  'WALK AWAY',
]

const SEP = <span style={{ color: '#ea6049', margin: '0 1rem' }}>///</span>

export function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-ink border-b-2 border-ink overflow-hidden py-3">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="text-[11px] font-bold tracking-[0.12em] text-paper"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item}
            </span>
            {SEP}
          </span>
        ))}
      </div>
    </div>
  )
}
