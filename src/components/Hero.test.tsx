import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  beforeEach(() => {
    render(<Hero />)
  })

  it('renders a résumé download link', () => {
    const link = screen.getByRole('link', { name: /download résumé/i })
    expect(link).toBeInTheDocument()
  })

  it('résumé link has download attribute', () => {
    const link = screen.getByRole('link', { name: /download résumé/i })
    expect(link).toHaveAttribute('download', 'Deepak_Kumar_Prasad_Resume.pdf')
  })

  it('résumé link points to the PDF', () => {
    const link = screen.getByRole('link', { name: /download résumé/i })
    expect(link.getAttribute('href')).toContain('deepak_prasad_26_1.pdf')
  })
})
