import { useState } from 'react'
import { Reveal } from './ui/Reveal'
import data from '../data/portfolio-data'

export function Certifications() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const d = data.certifications

  return (
    <section id="certifications" style={{ padding: '120px clamp(16px,8vw,140px)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-lo)', textTransform: 'uppercase', marginBottom: 16 }}>
          06 / Certifications
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--fg)', margin: '0 0 64px', letterSpacing: '-0.02em' }}>
          Credentials
        </h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {d.map((cert, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div style={{ border: '1px solid var(--line)', overflow: 'hidden' }}>
              <div
                role={cert.courses ? 'button' : undefined}
                tabIndex={cert.courses ? 0 : undefined}
                aria-expanded={cert.courses ? expanded === i : undefined}
                style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24, cursor: cert.courses ? 'pointer' : 'default', transition: 'background 0.2s' }} className="cert-row"
                onClick={() => cert.courses && setExpanded(expanded === i ? null : i)}
                onKeyDown={e => { if (cert.courses && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setExpanded(expanded === i ? null : i) } }}
                onMouseEnter={e => { if (cert.courses) e.currentTarget.style.background = 'var(--surf)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                    {cert.type === 'specialization' && (
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--text-hi)', border: '1px solid var(--line-mid)', padding: '2px 8px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Specialization</span>
                    )}
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{cert.year}</span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--fg)', marginBottom: 6, lineHeight: 1.3 }}>{cert.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-lo)' }}>{cert.issuer}</div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
                  <a href={cert.verify} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-lo)', letterSpacing: '0.1em', textDecoration: 'none', border: '1px solid var(--line-mid)', padding: '6px 14px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--line-hi)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-lo)'; e.currentTarget.style.borderColor = 'var(--line-mid)' }}>
                    VERIFY →
                  </a>
                  {cert.courses && (
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--text-dim)', transform: expanded === i ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▶</span>
                  )}
                </div>
              </div>

              {cert.courses && expanded === i && (
                <div style={{ borderTop: '1px solid var(--line)', padding: '8px 40px 24px', background: 'var(--surf)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, marginTop: 16 }}>Included Courses</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {cert.courses.map((c, ci) => (
                      <div key={ci} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-hi)' }}>↳ {c.name}</span>
                        <a href={c.verify} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', textDecoration: 'none', flexShrink: 0, transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
                          verify ↗
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
