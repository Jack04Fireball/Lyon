'use client'

import { useState } from 'react'
import type { LyonEvent, EventCategory } from '@/lib/data/events'
import EventCard from './EventCard'
import EventModal from './EventModal'

interface EventsGridProps {
  events:        LyonEvent[]
  locale:        string
  labelAll:      string
  labelFestival: string
  labelMuseum:   string
  labelConcert:  string
  labelTheater:  string
  labelMonth:    string
  labelLocation: string
  labelDate:     string
  labelCategory: string
  labelClose:    string
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
  const [activeMonth, setActiveMonth]       = useState<number | 'all'>('all')
  const [selectedEvent, setSelectedEvent]   = useState<LyonEvent | null>(null)

  const monthNames = locale === 'fr' ? MONTH_NAMES_FR : MONTH_NAMES_DE

  const categories: Array<{ key: EventCategory | 'all'; label: string }> = [
    { key: 'all',      label: labelAll },
    { key: 'festival', label: labelFestival },
    { key: 'museum',   label: labelMuseum },
    { key: 'concert',  label: labelConcert },
    { key: 'theater',  label: labelTheater },
  ]

  // Verfügbare Monate aus den Events ableiten
  const availableMonths = [...new Set(events.map(e => e.month))].sort((a, b) => a - b)

  const filtered = events.filter(e => {
    const catOk   = activeCategory === 'all' || e.category === activeCategory
    const monthOk = activeMonth    === 'all' || e.month    === activeMonth
    return catOk && monthOk
  })

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily:    'var(--font-inter)',
    fontSize:      'var(--fib-13)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background:    active ? 'var(--color-text)' : 'transparent',
    color:         active ? 'var(--color-ground)' : 'var(--color-text)',
    border:        '1px solid var(--color-text)',
    padding:       `var(--fib-8) var(--fib-13)`,
    cursor:        'pointer',
    transition:    'background 0.15s, color 0.15s',
  })

  return (
    <div>
      {/* Fibonacci-Raster: Filter */}
      <div
        style={{
          paddingInline: 'var(--fib-34)',
          paddingBottom: 'var(--fib-34)',
          display:       'flex',
          flexWrap:      'wrap',
          gap:           'var(--fib-8)',
        }}
      >
        {/* Kategorie-Filter */}
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={filterBtnStyle(activeCategory === cat.key)}
          >
            {cat.label}
          </button>
        ))}

        {/* Monat-Filter */}
        <div style={{ marginInlineStart: 'var(--fib-13)', display: 'flex', gap: 'var(--fib-8)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveMonth('all')}
            style={filterBtnStyle(activeMonth === 'all')}
          >
            {labelMonth}
          </button>
          {availableMonths.map(m => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              style={filterBtnStyle(activeMonth === m)}
            >
              {monthNames[m - 1]}
            </button>
          ))}
        </div>
      </div>

      {/* Geometrisches Raster: Event-Karten */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(var(--geo-cols), 1fr)',
          gap:                 'var(--geo-gutter)',
          paddingInline:       'var(--geo-margin)',
        }}
      >
        {filtered.map((event, i) => (
          <div
            key={event.id}
            style={{
              gridColumn: `span ${Math.ceil(12 / Math.min(3, filtered.length > 0 ? 3 : 1))}`,
            }}
          >
            <EventCard
              event={event}
              locale={locale}
              onClick={setSelectedEvent}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            paddingInline: 'var(--fib-34)',
            paddingBlock:  'var(--fib-89)',
            fontFamily:    'var(--font-inter)',
            fontSize:      'var(--fib-13)',
            color:         'var(--color-stone)',
          }}
        >
          —
        </div>
      )}

      {/* Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          locale={locale}
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
