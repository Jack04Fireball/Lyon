import { getTranslations, setRequestLocale } from 'next-intl/server'
import { events } from '@/lib/data/events'
import EventsGrid from '@/components/sections/EventsGrid'
import Reveal from '@/components/ui/Reveal'
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
      <section className="shell page-header">
        <Reveal delay={0}>
          <p className="page-header__eyebrow">Lyon</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="page-header__title">{t('title')}</h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="page-header__subtitle">{t('subtitle')}</p>
        </Reveal>
      </section>

      <section className="shell events-section">
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
