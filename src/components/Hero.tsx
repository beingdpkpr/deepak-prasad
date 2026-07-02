import { useTypingEffect } from '../hooks/useTypingEffect'
import data, { yearsExperience } from '../data/portfolio-data'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' })
}

export function Hero() {
  const typed = useTypingEffect(data.title)

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 clamp(16px,8vw,140px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(var(--surf) 1px, transparent 1px), linear-gradient(90deg, var(--surf) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '0.2em',
          color: 'var(--text-lo)', textTransform: 'uppercase', marginBottom: 24,
          animation: 'fadeUp 0.8s ease both',
        }}>
          Application Architect · Software Engineer
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: 'clamp(48px,8vw,112px)', lineHeight: 0.95,
          color: 'var(--fg)', margin: '0 0 24px',
          animation: 'fadeUp 0.8s ease 0.1s both',
          letterSpacing: '-0.02em',
        }}>
          {data.name.split(' ')[0]}<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--line-hi)' }}>
            {data.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(18px,2.5vw,28px)',
          color: 'var(--text-hi)', marginBottom: 40, height: 36,
          animation: 'fadeUp 0.8s ease 0.2s both',
        }}>
          <span style={{ color: 'var(--fg)' }}>{typed}</span>
          <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--fg)' }}>|</span>
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--text-lo)', maxWidth: 520,
          lineHeight: 1.7, marginBottom: 48,
          animation: 'fadeUp 0.8s ease 0.3s both',
        }}>
          {data.tagline}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeUp 0.8s ease 0.4s both' }}>
          <button onClick={() => scrollTo('experience')} style={{
            background: 'var(--fg)', color: 'var(--fg-inv)', border: 'none', cursor: 'pointer',
            padding: '14px 32px', fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--fg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--fg)')}>
            VIEW WORK ↓
          </button>
          <button onClick={() => scrollTo('contact')} style={{
            background: 'transparent', color: 'var(--fg)',
            border: '1px solid var(--line-hi)', cursor: 'pointer',
            padding: '14px 32px', fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line-hi)')}>
            GET IN TOUCH
          </button>
          <a
            href={`${import.meta.env.BASE_URL}assets/deepak_prasad_26_3.pdf`}
            download="Deepak_Kumar_Prasad_Resume.pdf"
            aria-label="Download résumé"
            style={{
              background: 'transparent', color: 'var(--fg)',
              border: '1px solid var(--line-hi)',
              padding: '14px 32px', fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 14, letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line-hi)')}
          >
            RÉSUMÉ ↓
          </a>
        </div>

        <div style={{
          display: 'flex', gap: 48, marginTop: 80, paddingTop: 48,
          borderTop: '1px solid var(--line)',
          animation: 'fadeUp 0.8s ease 0.5s both', flexWrap: 'wrap',
        }}>
          {([
            [`${yearsExperience}+ yrs`, 'Experience'],
            ['150+', 'Global Clients'],
            ['10+', 'Engineers Led'],
            ['50%', 'Runtime Reduction'],
          ] as [string, string][]).map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 32, color: 'var(--fg)' }}>{n}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text-lo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        animation: 'bounce 2s ease infinite', color: 'var(--text-dim)',
        fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <span>SCROLL</span><span>↓</span>
      </div>
    </section>
  )
}
