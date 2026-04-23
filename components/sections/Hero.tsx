import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'

interface HeroProps {
  quote: string
  intro: string
  linkHistory: string
  linkCulture: string
  imageAlt: string
}

export default function Hero({ quote, intro, linkHistory, linkCulture, imageAlt }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-media">
        <Image
          src="/images/brand/lyon-signage-vieux-lyon.png"
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 26%' }}
        />
      </div>

      <div className="shell hero-inner">
        <p className="hero-kicker">Identite publique · Metropole de Lyon</p>

        <div className="hero-content">
          <h1 className="hero-quote">{quote}</h1>
          <p className="hero-intro">{intro}</p>
          <div className="hero-signals" aria-label="Lyon Transit Tokens">
            <span className="hero-signal">
              <em>M</em>
              <em>D</em>
            </span>
            <span className="hero-signal">
              <em>F</em>
              <em>1</em>
            </span>
            <span className="hero-signal">
              <em>F</em>
              <em>2</em>
            </span>
          </div>
          <div className="hero-cta">
            <Link href="/geschichte" className="hero-cta__primary">
              {linkHistory}
            </Link>
            <Link href="/kultur" className="hero-cta__secondary">
              {linkCulture}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
