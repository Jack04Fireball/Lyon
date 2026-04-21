'use client'

import { useState } from 'react'
import type { LyonEvent, EventCategory } from '@/lib/data/events'
import EventCard from './EventCard'
import EventModal from './EventModal'
import Reveal from '@/components/ui/Reveal'

interface EventsGridProps {
  events: LyonEvent[]
  locale: string
  labelAll: string
  labelFestival: string
  labelMuseum: string
  labelConcert: string
  labelTheater: string
  labelMonth: string
  labelLocation: string
  labelDate: string
  labelCategory: string
  labelClose: string
}

const MONTH_NAMES_DE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const MONTH_NAMES_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']

export default function EventsGrid({
  events,
  locale,
  labelAll,
  labelFestival,
  labelMuseum,
  labelConcert,
  labelTheater,
  labelMonth,
  labelLocation,
  labelDate,
  labelCategory,
  labelClose,
}: EventsGridProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all')
  const [activeMonth, setActiveMonth] = useState<number | 'all'>('all')
  const [selectedEvent, setSelectedEvent] = useState<LyonEvent | null>(null)

  const monthNames = locale === 'fr' ? MONTH_NAMES_FR : MONTH_NAMES_DE

  const categories: Array<{ key: EventCategory | 'all'; label: string }> = [
    { key: 'all', label: labelAll },
    { key: 'festival', label: labelFestival },
    { key: 'museum', label: labelMuseum },
    { key: 'concert', label: labelConcert },
    { key: 'theater', label: labelTheater },
  ]

  const categoryLabels: Record<EventCategory, string> = {
    festival: labelFestival,
    museum: labelMuseum,
    concert: labelConcert,
    theater: labelTheater,
  }

  const availableMonths = [...new Set(events.map(e => e.month))].sort((a, b) => a - b)

  const filtered = events.filter(e => {
    const catOk = activeCategory === 'all' || e.category === activeCategory
    const monthOk = activeMonth === 'all' || e.month === activeMonth
    return catOk && monthOk
  })

  return (
    <div>
      <div className="events-filter">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`filter-btn${activeCategory === cat.key ? ' is-active' : ''}`}
          >
            {cat.label}
          </button>
        ))}

        <div className="events-filter__months">
          <button onClick={() => setActiveMonth('all')} className={`filter-btn${activeMonth === 'all' ? ' is-active' : ''}`}>
            {labelMonth}
          </button>
          {availableMonths.map(m => (
            <button key={m} onClick={() => setActiveMonth(m)} className={`filter-btn${activeMonth === m ? ' is-active' : ''}`}>
              {monthNames[m - 1]}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filtered.map((event, i) => (
          <Reveal key={event.id} delay={i % 3 * 90}>
            <EventCard
              event={event}
              locale={locale}
              categoryLabel={categoryLabels[event.category]}
              onClick={setSelectedEvent}
            />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && <div className="events-grid__empty">—</div>}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          locale={locale}
          categoryLabel={categoryLabels[selectedEvent.category]}
          labelLocation={labelLocation}
          labelDate={labelDate}
          labelCategory={labelCategory}
          labelClose={labelClose}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
