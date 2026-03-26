import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'

interface HeroProps {
  quote:       string
  intro:       string
  linkHistory: string
  linkCulture: string
}

export default function Hero({ quote, intro, linkHistory, linkCulture }: HeroProps) {
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
          alt="Lyon — Blick auf die Quais"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Subtiles Gradient-Overlay für Lesbarkeit */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to bottom, rgba(26,24,20,0.35) 0%, rgba(26,24,20,0.15) 50%, rgba(26,24,20,0.6) 100%)',
          }}
        />
      </div>

      {/* Fibonacci-Raster: Inhalt unten links */}
      <div
        style={{
          position:      'relative',
          zIndex:        1,
          minHeight:     '100svh',
          display:       'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingInline: 'var(--fib-55)',
          paddingBottom: 'var(--fib-89)',
        }}
      >
        {/* Zitat in Spectral */}
        <h1
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
        <div style={{ display: 'flex', gap: 'var(--fib-21)' }}>
          <Link
            href="/geschichte"
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      'var(--fib-13)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-ground)',
              borderBottom:  '1px solid rgba(245,240,232,0.5)',
              paddingBottom: '2px',
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
              color:         'rgba(245,240,232,0.65)',
              paddingBottom: '2px',
            }}
          >
            {linkCulture}
          </Link>
        </div>
      </div>
    </section>
  )
}
