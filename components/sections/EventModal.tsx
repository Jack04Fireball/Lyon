'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { LyonEvent } from '@/lib/data/events'

interface EventModalProps {
  event: LyonEvent
  locale: string
  categoryLabel: string
  labelLocation: string
  labelDate: string
  labelCategory: string
  labelClose: string
  onClose: () => void
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const categoryColors: Record<string, string> = {
  festival: 'var(--color-terracotta)',
  museum: 'var(--color-river)',
  concert: '#8c6a3d',
  theater: 'var(--color-stone)',
}

export default function EventModal({
  event,
  locale,
  categoryLabel,
  labelLocation,
  labelDate,
  labelCategory,
  labelClose,
  onClose,
}: EventModalProps) {
  const title = locale === 'fr' ? event.titleFr : event.titleDe
  const desc = locale === 'fr' ? event.descFr : event.descDe
  const catColor = categoryColors[event.category]

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div role="dialog" aria-modal aria-label={title} className="event-modal-backdrop" onClick={onClose}>
      <div className="event-modal" onClick={e => e.stopPropagation()}>
        <div className="event-modal__media">
          <Image src={event.image} alt={title} fill sizes="860px" style={{ objectFit: 'cover' }} />
        </div>

        <div className="event-modal__body" style={{ borderTop: `3px solid ${catColor}` }}>
          <p className="event-modal__category" style={{ color: catColor }}>
            {labelCategory}: {categoryLabel}
          </p>

          <h2 className="event-modal__title">{title}</h2>

          <dl className="event-modal__meta">
            <dt>{labelDate}</dt>
            <dd>{formatDate(event.date, locale)}</dd>
            <dt>{labelLocation}</dt>
            <dd>{event.location}</dd>
          </dl>

          <p className="event-modal__description">{desc}</p>

          <button onClick={onClose} className="event-modal__close">
            {labelClose}
          </button>
        </div>
      </div>
    </div>
  )
}
