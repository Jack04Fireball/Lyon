import { getTranslations, setRequestLocale } from 'next-intl/server'
import { events } from '@/lib/data/events'
import EventsGrid from '@/components/sections/EventsGrid'
import { routing } from '@/lib/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function KulturPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Culture' })

  return (
    <>
      {/* 2D-Geometrie + Fibonacci-Rhythmus: Seiten-Header */}
      <section className="geo-grid-2d page-header">
        <p
          className="page-header__eyebrow"
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      'var(--fib-13)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-terracotta)',
          }}
        >
          Lyon
        </p>
        <h1
          className="page-header__title"
          style={{
            fontFamily:    'var(--font-spectral)',
            fontSize:      'clamp(2.5rem, 6vw, var(--fib-89))',
            fontWeight:    300,
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            margin:        0,
          }}
        >
          {t('title')}
        </h1>
        <p
          className="page-header__subtitle"
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      'var(--fib-13)',
            color:         'var(--color-stone)',
            letterSpacing: '0.05em',
          }}
        >
          {t('subtitle')}
        </p>
      </section>

      {/* Events + Filter */}
      <section style={{ paddingBlock: 'var(--fib-55)' }}>
        <EventsGrid
          events={events}
          locale={locale}
          labelAll={t('filterAll')}
          labelFestival={t('filterFestival')}
          labelMuseum={t('filterMuseum')}
          labelConcert={t('filterConcert')}
          labelTheater={t('filterTheater')}
          labelMonth={t('filterMonth')}
          labelLocation={t('location')}
          labelDate={t('date')}
          labelCategory={t('category')}
          labelClose={t('close')}
        />
      </section>
    </>
  )
}
