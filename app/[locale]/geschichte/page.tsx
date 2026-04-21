import { getTranslations, setRequestLocale } from 'next-intl/server'
import { historyEpochs } from '@/lib/data/history'
import HistoryTimeline from '@/components/sections/HistoryTimeline'
import Reveal from '@/components/ui/Reveal'
import { routing } from '@/lib/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function GeschichtePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'History' })

  return (
    <>
      <section className="shell page-header page-header--history">
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

      <HistoryTimeline epochs={historyEpochs} />
    </>
  )
}
