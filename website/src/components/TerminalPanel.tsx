import { useEffect, useRef, useState } from 'react'

interface TerminalPanelProps {
  lines: string[]
  title?: string
  showCursor?: boolean
  delay?: number
  className?: string
}

export function TerminalPanel({
  lines,
  title = 'Terminal',
  showCursor = false,
  delay = 0,
  className = '',
}: TerminalPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          setTimeout(() => setStarted(true), delay)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (visibleCount >= lines.length) return
    const timer = setTimeout(() => setVisibleCount(v => v + 1), 80)
    return () => clearTimeout(timer)
  }, [started, visibleCount, lines.length])

  const colorLine = (line: string) => {
    if (!line) return <>&nbsp;</>
    return line.split(/(\$\s|✓|►|⏰|💡|─+)/).map((part, i) => {
      if (part === '$ ' || part === '$ ') return <span key={i} style={{ color: '#ea6049' }}>$ </span>
      if (part === '✓') return <span key={i} style={{ color: '#27c93f' }}>✓</span>
      if (part === '►') return <span key={i} style={{ color: '#ea6049' }}>►</span>
      if (part === '⏰') return <span key={i} style={{ color: '#ea6049' }}>⏰</span>
      if (part === '💡') return <span key={i} style={{ color: '#fbbf24' }}>💡</span>
      if (/^─+$/.test(part)) return <span key={i} style={{ color: '#444' }}>{part}</span>
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div
      ref={ref}
      className={`rounded-lg overflow-hidden border border-[#333] ${className}`}
      style={{ background: '#1a1a1a' }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-1.5 px-3"
        style={{ background: '#2a2a2a', height: '32px' }}
      >
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
        <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
        <span
          className="ml-2 text-[11px] tracking-[0.06em]"
          style={{ color: '#6b6b6b', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="p-4" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#e0e0e0', lineHeight: '1.6' }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="term-line"
            style={{
              animationDelay: `${i * 80}ms`,
              opacity: i < visibleCount ? 1 : 0,
              animation: i < visibleCount ? `fadeIn 0.15s ease ${i * 80}ms forwards` : 'none',
            }}
          >
            {colorLine(line)}
          </div>
        ))}
        {showCursor && visibleCount >= lines.length && (
          <div className="h-4 flex items-center">
            <span className="cursor"></span>
          </div>
        )}
      </div>
    </div>
  )
}
