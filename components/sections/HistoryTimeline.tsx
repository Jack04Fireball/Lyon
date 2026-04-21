import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import type { HistoryEpoch } from '@/lib/data/history'
import Reveal from '@/components/ui/Reveal'

interface HistoryTimelineProps {
  epochs: HistoryEpoch[]
}

export default async function HistoryTimeline({ epochs }: HistoryTimelineProps) {
  const locale = await getLocale()
  const isDE = locale === 'de'

  return (
    <section className="shell history-timeline">
      {epochs.map((epoch, index) => {
        const title = isDE ? epoch.titleDe : epoch.titleFr
        const text = isDE ? epoch.textDe : epoch.textFr
        const quote = isDE ? epoch.quoteDe : epoch.quoteFr
        const label = isDE ? epoch.epochDe : epoch.epochFr
        const imageAlt = isDE ? epoch.imageAltDe : epoch.imageAltFr
        const itemIndex = String(index + 1).padStart(2, '0')

        return (
          <Reveal key={epoch.id} className={`history-item${index % 2 === 1 ? ' is-reverse' : ''}`} delay={(index % 3) * 80}>
            <div className="history-item__media">
              <Image
                src={epoch.image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: index % 2 === 0 ? 'center 35%' : 'center 55%' }}
              />
            </div>

            <div className="history-item__body">
              <span className="history-item__index" aria-hidden="true">
                {itemIndex}
              </span>
              <p className="history-item__epoch">{label}</p>
              <h2 className="history-item__title">{title}</h2>
              <p className="history-item__text">{text}</p>
              <blockquote className="history-item__quote">„{quote}"</blockquote>
            </div>
          </Reveal>
        )
      })}
    </section>
  )
}
