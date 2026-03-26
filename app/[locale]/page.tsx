import { useTranslations, useLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
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

  // Direktes Übersetzen via useTranslations() geht in Server Components nur wenn
  // setRequestLocale() vorher aufgerufen wird – wir nutzen useTranslations als
  // Hilfskonstrukt via unstable_setRequestLocale. Alternativ: getTranslations()
  const isFr = locale === 'fr'

  const heroData = {
    quote: isFr
      ? "Dans la confluence naît l'identité."
      : 'Im Zusammenfluss entsteht Identität.',
    intro: isFr
      ? "Lyon est née à la confluence du Rhône et de la Saône. Deux fleuves, deux ordres, une ville. Ici se rencontrent l'histoire et le présent, l'architecture et l'espace de vie, le silence et le mouvement."
      : 'Lyon liegt am Zusammenfluss von Rhône und Saône. Zwei Flüsse, zwei Ordnungen, eine Stadt. Hier begegnen sich Geschichte und Gegenwart, Architektur und Lebensraum, Stille und Bewegung.',
    linkHistory: isFr ? "Découvrir l'histoire" : 'Geschichte entdecken',
    linkCulture: isFr ? 'Culture & Événements' : 'Kultur & Events',
  }

  return (
    <>
      {/* 1. Hero-Sektion */}
      <Hero
        quote={heroData.quote}
        intro={heroData.intro}
        linkHistory={heroData.linkHistory}
        linkCulture={heroData.linkCulture}
      />

      {/* 2. Teaserblock: Geschichte + Kultur (geometrisches Raster) */}
      <section
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(var(--geo-cols), 1fr)',
          gap:                 'var(--geo-gutter)',
          paddingInline:       'var(--geo-margin)',
          paddingBlock:        'var(--fib-144)',
        }}
      >
        {/* Geschichte-Teaser */}
        <Link
          href="/geschichte"
          style={{ gridColumn: '1 / 7', display: 'block' }}
        >
          <div style={{ aspectRatio: '3/2', position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/images/alasdair1907-lyon-7875644.jpg"
              alt={isFr ? 'Histoire de Lyon' : 'Geschichte Lyons'}
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              paddingBlock:   'var(--fib-21)',
              borderTop:      '1px solid var(--color-text)',
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'baseline',
            }}
          >
            <span style={{ fontFamily: 'var(--font-spectral)', fontSize: 'var(--fib-21)', fontWeight: 400 }}>
              {isFr ? 'Histoire & Identité' : 'Geschichte & Identität'}
            </span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--fib-13)', color: 'var(--color-stone)', letterSpacing: '0.1em' }}>→</span>
          </div>
        </Link>

        {/* Kultur-Teaser */}
        <Link
          href="/kultur"
          style={{ gridColumn: '7 / 13', display: 'block' }}
        >
          <div style={{ aspectRatio: '3/2', position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/images/ludo-photos-abstract-4124262_1920.jpg"
              alt={isFr ? 'Culture & Événements' : 'Kultur & Events'}
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              paddingBlock:   'var(--fib-21)',
              borderTop:      '1px solid var(--color-text)',
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'baseline',
            }}
          >
            <span style={{ fontFamily: 'var(--font-spectral)', fontSize: 'var(--fib-21)', fontWeight: 400 }}>
              {isFr ? 'Culture & Événements' : 'Kultur & Events'}
            </span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--fib-13)', color: 'var(--color-stone)', letterSpacing: '0.1em' }}>→</span>
          </div>
        </Link>
      </section>
    </>
  )
}
