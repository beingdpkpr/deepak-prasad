import { useState, useRef } from 'react'
import { Reveal } from './ui/Reveal'
import { sendEmail, isEmailJSConfigured } from '../lib/emailjs'
import type { FormState } from '../types'
import data from '../data/portfolio-data'

const COOLDOWN_MS = 30_000
const STORAGE_KEY = 'contact_last_sent'

function validate(name: string, email: string, message: string): string | null {
  if (name.trim().length < 2)        return 'Name must be at least 2 characters.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.'
  if (message.trim().length < 5)     return 'Please enter a message.'
  if (message.trim().length > 3000)  return 'Message must be under 3000 characters.'
  return null
}

function isCoolingDown(): boolean {
  const last = sessionStorage.getItem(STORAGE_KEY)
  if (!last) return false
  return Date.now() - Number(last) < COOLDOWN_MS
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent',
  border: 'none', borderBottom: '1px solid var(--line-mid)',
  color: 'var(--fg)', fontFamily: "'Inter', sans-serif", fontSize: 16,
  padding: '16px 0', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export function Contact() {
  const d = data
  const configured = isEmailJSConfigured()
  const [formState, setFormState] = useState<FormState>('idle')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [error, setError]     = useState<string | null>(null)
  const [sendError, setSendError] = useState<string | null>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypotRef.current?.value) return
    const validationError = validate(name, email, message)
    if (validationError) { setError(validationError); return }
    if (isCoolingDown()) { setError('Please wait a moment before sending another message.'); return }
    setError(null); setSendError(null); setFormState('sending')
    try {
      await sendEmail({ from_name: name, from_email: email, message })
      sessionStorage.setItem(STORAGE_KEY, String(Date.now()))
      setFormState('success')
      setName(''); setEmail(''); setMessage('')
    } catch (err) {
      setSendError(err instanceof Error ? err.message : String(err))
      setFormState('error')
    }
  }

  return (
    <section id="contact" style={{ padding: '120px clamp(16px,8vw,140px)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-lo)', textTransform: 'uppercase', marginBottom: 16 }}>
          08 / Contact
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--fg)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Let's Talk
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--text-lo)', marginBottom: 80, maxWidth: 480, lineHeight: 1.7 }}>
          Open to interesting problems, architecture challenges, and meaningful collaborations.
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="contact-grid">
        <Reveal delay={0.1}>
          {!configured ? (
            <div style={{ padding: '32px', border: '1px solid var(--line)' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text-lo)', lineHeight: 1.8 }}>
                Contact form temporarily unavailable.<br />
                Reach out directly at <a href={`mailto:${d.email}`} style={{ color: 'var(--text-hi)' }}>{d.email}</a>
              </div>
            </div>
          ) : formState === 'success' ? (
            <div style={{ padding: '48px', border: '1px solid var(--line-mid)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, color: 'var(--fg)', marginBottom: 12 }}>
                Message sent ✓
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-lo)', marginBottom: 32 }}>
                I'll be in touch soon.
              </div>
              <button onClick={() => setFormState('idle')} style={{ background: 'none', border: '1px solid var(--line-hi)', color: 'var(--text-lo)', cursor: 'pointer', padding: '8px 20px', fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.1em', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--fg)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-lo)'; e.currentTarget.style.borderColor = 'var(--line-hi)' }}>
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }} noValidate>
              {/* Honeypot — hidden from real users */}
              <input ref={honeypotRef} type="text" name="website" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
              <div>
                <input type="text" placeholder="Your Name" aria-label="Your name" value={name} required
                  onChange={e => setName(e.target.value)} style={inputStyle}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--fg)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'var(--line-mid)')} />
              </div>
              <div>
                <input type="email" placeholder="Your Email" aria-label="Your email address" value={email} required
                  onChange={e => setEmail(e.target.value)} style={inputStyle}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--fg)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'var(--line-mid)')} />
              </div>
              <div>
                <textarea placeholder="Your Message" aria-label="Your message" value={message} required rows={4}
                  onChange={e => setMessage(e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--fg)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'var(--line-mid)')} />
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--text-dim)', marginTop: 6, textAlign: 'right' }}>
                  {message.length} / 3000
                </div>
              </div>
              {error && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--error)' }}>{error}</div>}
              {formState === 'error' && (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--error)' }}>
                  {sendError ?? 'Something went wrong. Please try again or email directly.'}
                </div>
              )}
              <button type="submit" disabled={formState === 'sending'}
                style={{
                  background: 'var(--fg)', color: 'var(--fg-inv)',
                  border: 'none', cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                  padding: '16px 40px', fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: '0.05em',
                  alignSelf: 'flex-start', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (formState !== 'sending') e.currentTarget.style.background = 'var(--fg-hover)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--fg)' }}>
                {formState === 'sending' ? 'SENDING…' : 'SEND MESSAGE →'}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {([
              ['Location', d.location, null],
              ['Email',    d.email,    `mailto:${d.email}`],
              ['Phone',    d.phone,    `tel:${d.phone}`],
              ['LinkedIn', d.linkedinLabel, d.linkedin],
              ['GitHub',   d.githubLabel,   d.github],
            ] as const).map(([label, val, href]) => (
              <div key={label} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 24 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: 'var(--text-hi)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-hi)')}>
                    {val}
                  </a>
                ) : (
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: 'var(--text-hi)' }}>{val}</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
