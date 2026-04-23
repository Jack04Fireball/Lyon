import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'
import Hero from '@/components/sections/Hero'
import Reveal from '@/components/ui/Reveal'
import { routing } from '@/lib/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const heroT = await getTranslations({ locale, namespace: 'Hero' })
  const homeT = await getTranslations({ locale, namespace: 'Home' })

  return (
    <>
      <Hero
        quote={heroT('quote')}
        intro={heroT('intro')}
        linkHistory={heroT('linkHistory')}
        linkCulture={heroT('linkCulture')}
        imageAlt={heroT('imageAlt')}
      />

      <section className="shell home-teasers">
        <Reveal>
          <Link href="/geschichte" className="home-teaser">
            <div className="home-teaser__media">
              <Image
                src="/images/brand/lyon-bollard-stonewall.png"
                alt={homeT('historyTeaserAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="home-teaser__meta">
              <span className="home-teaser__title">{homeT('historyTeaserTitle')}</span>
              <span className="home-teaser__arrow">→</span>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <Link href="/kultur" className="home-teaser">
            <div className="home-teaser__media">
              <Image
                src="/images/brand/lyon-bus-livery.png"
                alt={homeT('cultureTeaserAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="home-teaser__meta">
              <span className="home-teaser__title">{homeT('cultureTeaserTitle')}</span>
              <span className="home-teaser__arrow">→</span>
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  )
}
