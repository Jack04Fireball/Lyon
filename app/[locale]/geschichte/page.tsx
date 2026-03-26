import { getTranslations, setRequestLocale } from 'next-intl/server'
import { historyEpochs } from '@/lib/data/history'
import HistoryTimeline from '@/components/sections/HistoryTimeline'
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
      {/* Fibonacci-Raster: Seiten-Header */}
      <section
        style={{
          paddingTop:    'calc(var(--fib-89) + var(--fib-55))',
          paddingInline: 'var(--fib-55)',
          paddingBottom: 'var(--fib-89)',
          borderBottom:  '1px solid var(--color-text)',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      'var(--fib-13)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-terracotta)',
            marginBottom:  'var(--fib-21)',
          }}
        >
          Lyon
        </p>
        <h1
          style={{
            fontFamily:    'var(--font-spectral)',
            fontSize:      'clamp(2.5rem, 6vw, var(--fib-89))',
            fontWeight:    300,
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            maxWidth:      '16ch',
            marginBottom:  'var(--fib-34)',
          }}
        >
          {t('title')}
        </h1>
        <p
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

      {/* Timeline: alle Epochen */}
      <HistoryTimeline epochs={historyEpochs} />
    </>
  )
}
