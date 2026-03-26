'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { LyonEvent } from '@/lib/data/events'

interface EventModalProps {
  event:   LyonEvent
  locale:  string
  labelLocation: string
  labelDate:     string
  labelCategory: string
  labelClose:    string
  onClose: () => void
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'de-DE', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
}

const categoryColors: Record<string, string> = {
  festival: 'var(--color-terracotta)',
  museum:   'var(--color-river)',
  concert:  'var(--color-ochre)',
  theater:  'var(--color-stone)',
}

export default function EventModal({
  event,
  locale,
  labelLocation,
  labelDate,
  labelCategory,
  labelClose,
  onClose,
}: EventModalProps) {
  const title = locale === 'fr' ? event.titleFr : event.titleDe
  const desc  = locale === 'fr' ? event.descFr  : event.descDe
  const catColor = categoryColors[event.category]

  // ESC zum Schliessen
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Scroll sperren
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={title}
      onClick={onClose}
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     1000,
        background: 'rgba(26,24,20,0.75)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:    'var(--fib-34)',
      }}
    >
      {/* Modal-Inhalt */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:  'var(--color-ground)',
          maxWidth:    '720px',
          width:       '100%',
          maxHeight:   '90vh',
          overflow:    'auto',
          display:     'flex',
          flexDirection: 'column',
        }}
      >
        {/* Geometrisches Raster: Bild */}
        <div style={{ position: 'relative', aspectRatio: '16/7', flexShrink: 0 }}>
          <Image
            src={event.image}
            alt={title}
            fill
            sizes="720px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Fibonacci-Raster: Inhalt */}
        <div style={{ padding: 'var(--fib-34)', borderTop: `3px solid ${catColor}` }}>
          {/* Kategorie */}
          <p
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      'var(--fib-13)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         catColor,
              marginBottom:  'var(--fib-13)',
            }}
          >
            {labelCategory}: {event.category}
          </p>

          {/* Titel */}
          <h2
            style={{
              fontFamily:    'var(--font-spectral)',
              fontSize:      'var(--fib-34)',
              fontWeight:    400,
              lineHeight:    1.15,
              letterSpacing: '-0.02em',
              marginBottom:  'var(--fib-21)',
            }}
          >
            {title}
          </h2>

          {/* Metadaten */}
          <dl
            style={{
              display:        'grid',
              gridTemplateColumns: 'auto 1fr',
              gap:            `var(--fib-8) var(--fib-21)`,
              fontFamily:     'var(--font-inter)',
              fontSize:       'var(--fib-13)',
              marginBottom:   'var(--fib-34)',
            }}
          >
            <dt style={{ color: 'var(--color-stone)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{labelDate}</dt>
            <dd>{formatDate(event.date, locale)}</dd>
            <dt style={{ color: 'var(--color-stone)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{labelLocation}</dt>
            <dd>{event.location}</dd>
          </dl>

          {/* Beschreibung */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   'var(--fib-13)',
              lineHeight: 1.75,
              color:      'var(--color-text)',
              marginBottom: 'var(--fib-34)',
            }}
          >
            {desc}
          </p>

          {/* Schliessen */}
          <button
            onClick={onClose}
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      'var(--fib-13)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background:    'none',
              border:        '1px solid var(--color-text)',
              padding:       `var(--fib-8) var(--fib-21)`,
              cursor:        'pointer',
              color:         'var(--color-text)',
            }}
          >
            {labelClose}
          </button>
        </div>
      </div>
    </div>
  )
}
