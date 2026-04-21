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
          src="/images/twalmedia-lyon-3598618_1920.jpg"
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
        />
      </div>

      <div className="shell hero-inner">
        <div className="hero-content">
          <h1 className="hero-quote">{quote}</h1>
          <p className="hero-intro">{intro}</p>
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
