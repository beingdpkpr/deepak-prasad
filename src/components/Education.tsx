import { useState } from 'react'
import { Reveal } from './ui/Reveal'
import data from '../data/portfolio-data'

export function Education() {
  const [openProj, setOpenProj] = useState<string | null>(null)
  const d = data.education

  return (
    <section id="education" style={{ padding: '120px clamp(16px,8vw,140px)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-lo)', textTransform: 'uppercase', marginBottom: 16 }}>
          05 / Education
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--fg)', margin: '0 0 64px', letterSpacing: '-0.02em' }}>
          Academic Background
        </h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {d.map((edu, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ padding: '40px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }} className="edu-card">
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: 'var(--fg)', marginBottom: 8 }}>{edu.degree}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--text-mid)', marginBottom: 8 }}>{edu.institution}</div>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em' }}>{edu.detail}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text-hi)', letterSpacing: '0.08em' }}>GPA: {edu.gpa}</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 40, color: 'var(--surf-hover)', letterSpacing: '-0.02em', flexShrink: 0 }}>{edu.year}</div>
              </div>

              {edu.projects && (
                <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Academic Projects</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 1 }}>
                    {edu.projects.map((p, pi) => {
                      const key = `${i}-${pi}`
                      return (
                        <button key={pi}
                          onClick={() => setOpenProj(openProj === key ? null : key)}
                          aria-expanded={openProj === key}
                          style={{
                            padding: '24px', border: '1px solid var(--line)', cursor: 'pointer',
                            background: openProj === key ? 'var(--surf)' : 'transparent', transition: 'background 0.2s',
                            width: '100%', textAlign: 'left', display: 'block',
                          }}>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--fg)', marginBottom: 8 }}>{p.title}</div>
                          {openProj === key && (
                            <div>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.7, margin: '0 0 12px' }}>{p.description}</p>
                              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-lo)', border: '1px solid var(--line)', padding: '3px 10px', letterSpacing: '0.08em' }}>{p.tech}</span>
                            </div>
                          )}
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-dim)', marginTop: 8 }}>
                            {openProj === key ? 'collapse' : '+ details'}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {edu.achievements && (
                <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Achievements</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {edu.achievements.map((a, ai) => (
                      <div key={ai} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--text-lo)', flexShrink: 0, marginTop: 2 }}>→</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-hi)', lineHeight: 1.6 }}>{a}</span>
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
