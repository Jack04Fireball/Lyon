import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'

interface HeroProps {
  quote:       string
  intro:       string
  linkHistory: string
  linkCulture: string
  imageAlt:    string
}

export default function Hero({ quote, intro, linkHistory, linkCulture, imageAlt }: HeroProps) {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>

      {/* Geometrisches Raster: Vollbild-Bild */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          zIndex:   0,
        }}
      >
        <Image
          src="/images/twalmedia-lyon-3598618_1920.jpg"
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Gradient-Overlay für Lesbarkeit */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to bottom, rgba(26,24,20,0.55) 0%, rgba(26,24,20,0.3) 40%, rgba(26,24,20,0.82) 100%)',
          }}
        />
      </div>

      {/* 2D-Raster: Inhalt an Spalten + Reihen verankern */}
      <div className="geo-grid-2d hero-layout">
        <div
          className="hero-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        {/* Zitat in Spectral */}
        <h1
          className="hero-quote"
          style={{
            fontFamily:   'var(--font-spectral)',
            fontSize:     'clamp(2rem, 5vw, var(--fib-89))',
            fontWeight:   300,
            color:        'var(--color-ground)',
            lineHeight:   1.1,
            letterSpacing: '-0.02em',
            maxWidth:     '18ch',
            marginBottom: 'var(--fib-34)',
          }}
        >
          {quote}
        </h1>

        {/* Intro-Text in Inter */}
        <p
          className="hero-intro"
          style={{
            fontFamily:   'var(--font-inter)',
            fontSize:     'var(--fib-13)',
            color:        'rgba(245,240,232,0.85)',
            lineHeight:   1.7,
            maxWidth:     '52ch',
            marginBottom: 'var(--fib-55)',
          }}
        >
          {intro}
        </p>

        {/* CTA-Links */}
        <div className="hero-cta" style={{ display: 'flex', gap: 'var(--fib-21)', alignItems: 'center' }}>
          <Link
            href="/geschichte"
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      'var(--fib-13)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-ground)',
              borderBottom:  '1px solid rgba(245,240,232,0.9)',
              paddingBottom: '3px',
            }}
          >
            {linkHistory}
          </Link>
          <Link
            href="/kultur"
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      'var(--fib-13)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'rgba(245,240,232,0.75)',
              borderBottom:  '1px solid rgba(245,240,232,0.35)',
              paddingBottom: '3px',
            }}
          >
            {linkCulture}
          </Link>
        </div>
        </div>
      </div>
    </section>
  )
}
