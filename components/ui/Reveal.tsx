'use client'

import { useRef, useEffect } from 'react'

interface RevealProps {
  children:  React.ReactNode
  className?: string
  delay?:     number
  style?:     React.CSSProperties
}

/**
 * Scroll-Reveal-Wrapper.
 * Fügt `.is-visible` hinzu, sobald das Element im Viewport erscheint.
 * Elemente die beim Laden bereits sichtbar sind, werden sofort eingeblendet.
 */
export default function Reveal({ children, className = '', delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Bereits im Viewport (z.B. above the fold) → sofort zeigen
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
