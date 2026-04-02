import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'
import Hero from '@/components/sections/Hero'
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
      {/* 1. Hero-Sektion */}
      <Hero
        quote={heroT('quote')}
        intro={heroT('intro')}
        linkHistory={heroT('linkHistory')}
        linkCulture={heroT('linkCulture')}
        imageAlt={heroT('imageAlt')}
      />

      {/* 2. Teaserblock: Geschichte + Kultur (geometrisches Raster) */}
      <section className="geo-grid-2d home-teasers">
        {/* Geschichte-Teaser */}
        <Link
          href="/geschichte"
          className="home-teaser home-teaser--history"
        >
          <div className="home-teaser__media">
            <Image
              src="/images/alasdair1907-lyon-7875644.jpg"
              alt={homeT('historyTeaserAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            className="home-teaser__meta"
          >
            <span className="home-teaser__title">
              {homeT('historyTeaserTitle')}
            </span>
            <span className="home-teaser__arrow">→</span>
          </div>
        </Link>

        {/* Kultur-Teaser */}
        <Link
          href="/kultur"
          className="home-teaser home-teaser--culture"
        >
          <div className="home-teaser__media">
            <Image
              src="/images/ludo-photos-abstract-4124262_1920.jpg"
              alt={homeT('cultureTeaserAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            className="home-teaser__meta"
          >
            <span className="home-teaser__title">
              {homeT('cultureTeaserTitle')}
            </span>
            <span className="home-teaser__arrow">→</span>
          </div>
        </Link>
      </section>
    </>
  )
}
