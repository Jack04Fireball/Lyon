import Image from 'next/image'
import type { LyonEvent } from '@/lib/data/events'

interface EventCardProps {
  event: LyonEvent
  locale: string
  categoryLabel: string
  onClick: (event: LyonEvent) => void
}

const categoryColors: Record<string, string> = {
  festival: 'var(--color-terracotta)',
  museum: 'var(--color-river)',
  concert: '#8c6a3d',
  theater: 'var(--color-stone)',
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function EventCard({ event, locale, categoryLabel, onClick }: EventCardProps) {
  const title = locale === 'fr' ? event.titleFr : event.titleDe
  const catColor = categoryColors[event.category]
  const openLabel = `${title} (${formatDate(event.date, locale)})`

  return (
    <article
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={openLabel}
      onClick={() => onClick(event)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(event)
        }
      }}
      className="event-card"
    >
      <div className="event-card__media">
        <Image
          src={event.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="event-card__meta" style={{ borderTop: `2px solid ${catColor}` }}>
        <div className="event-card__top">
          <span className="event-card__category" style={{ color: catColor }}>
            {categoryLabel}
          </span>
          <span className="event-card__date">{formatDate(event.date, locale)}</span>
        </div>

        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__location">{event.location}</p>
      </div>
    </article>
  )
}
