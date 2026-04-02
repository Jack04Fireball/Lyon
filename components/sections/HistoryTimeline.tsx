import { getLocale } from 'next-intl/server'
import type { HistoryEpoch } from '@/lib/data/history'
import ImageBlock from './ImageBlock'
import EditorialBlock from './EditorialBlock'
import QuoteBlock from './QuoteBlock'

interface HistoryTimelineProps {
  epochs: HistoryEpoch[]
}

export default async function HistoryTimeline({ epochs }: HistoryTimelineProps) {
  const locale = await getLocale()
  const isDE = locale === 'de'

  return (
    <div>
      {epochs.map((epoch, index) => {
        const isEven = index % 2 === 0
        const title  = isDE ? epoch.titleDe  : epoch.titleFr
        const text   = isDE ? epoch.textDe   : epoch.textFr
        const quote  = isDE ? epoch.quoteDe  : epoch.quoteFr
        const label  = isDE ? epoch.epochDe  : epoch.epochFr
        const imageAlt = isDE ? epoch.imageAltDe : epoch.imageAltFr

        return (
          <article key={epoch.id}>
            {/* Trennlinie */}
            <div
              style={{
                height:      '1px',
                background:  'var(--color-text)',
                marginInline: 'var(--fib-34)',
                opacity:     0.12,
              }}
            />

            {/* Geometrisches Raster: Bild — volle Breite */}
            <ImageBlock
              src={epoch.image}
              alt={imageAlt}
              height="55vh"
              position={isEven ? 'center 30%' : 'center 60%'}
            />

            {/* Fibonacci-Raster: Text-Box (überlappt Bild leicht) */}
            <div
              style={{
                display:        'flex',
                justifyContent: isEven ? 'flex-start' : 'flex-end',
                paddingInline:  'var(--fib-21)',
                marginTop:      'calc(var(--fib-55) * -1)',
                position:       'relative',
                zIndex:         1,
              }}
            >
              <div
                style={{
                  background: 'var(--color-ground)',
                  maxWidth:   'var(--fib-610)',
                  width:      '100%',
                }}
              >
                <EditorialBlock
                  label={label}
                  title={title}
                  text={text}
                  maxWidth="none"
                />
              </div>
            </div>

            {/* Fibonacci-Raster: Pull-Quote */}
            <div
              style={{
                display:        'flex',
                justifyContent: isEven ? 'flex-end' : 'flex-start',
                paddingInline:  'var(--fib-34)',
              }}
            >
              <QuoteBlock text={quote} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
