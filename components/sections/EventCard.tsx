import Image from 'next/image'
import type { LyonEvent } from '@/lib/data/events'

interface EventCardProps {
  event:    LyonEvent
  locale:   string
  onClick:  (event: LyonEvent) => void
}

const categoryColors: Record<string, string> = {
  festival: 'var(--color-terracotta)',
  museum:   'var(--color-river)',
  concert:  'var(--color-ochre)',
  theater:  'var(--color-stone)',
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'de-DE', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

export default function EventCard({ event, locale, onClick }: EventCardProps) {
  const title   = locale === 'fr' ? event.titleFr : event.titleDe
  const catColor = categoryColors[event.category]

  return (
    <article
      onClick={() => onClick(event)}
      style={{
        cursor:  'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap:     0,
      }}
    >
      {/* Geometrisches Raster: Bild */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image
          src={event.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>

      {/* Fibonacci-Raster: Metadaten + Titel */}
      <div
        style={{
          paddingBlock:  'var(--fib-21)',
          paddingInline: 0,
          borderTop:     `2px solid ${catColor}`,
        }}
      >
        {/* Kategorie + Datum */}
        <div
          style={{
            display:       'flex',
            justifyContent: 'space-between',
            alignItems:    'baseline',
            marginBottom:  'var(--fib-8)',
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      'var(--fib-13)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         catColor,
            }}
          >
            {event.category}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   'var(--fib-13)',
              color:      'var(--color-stone)',
            }}
          >
            {formatDate(event.date, locale)}
          </span>
        </div>

        {/* Titel */}
        <h3
          style={{
            fontFamily:    'var(--font-spectral)',
            fontSize:      'var(--fib-21)',
            fontWeight:    400,
            lineHeight:    1.2,
            letterSpacing: '-0.01em',
            marginBottom:  'var(--fib-8)',
          }}
        >
          {title}
        </h3>

        {/* Ort */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize:   'var(--fib-13)',
            color:      'var(--color-stone)',
          }}
        >
          {event.location}
        </p>
      </div>
    </article>
  )
}
