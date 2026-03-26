import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import Logo from './Logo'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer
      style={{
        borderTop:     '1px solid var(--color-text)',
        paddingInline: 'var(--fib-34)',
        paddingBlock:  'var(--fib-55)',
        display:       'grid',
        gridTemplateColumns: 'repeat(var(--geo-cols), 1fr)',
        gap:           'var(--geo-gutter)',
        marginTop:     'var(--fib-144)',
      }}
    >
      {/* Logo + Tagline (geometrisches Raster: Spalten 1–4) */}
      <div style={{ gridColumn: '1 / 4' }}>
        <Logo size={28} />
        <p
          style={{
            fontFamily:    'var(--font-spectral)',
            fontSize:      'var(--fib-13)',
            fontStyle:     'italic',
            color:         'var(--color-stone)',
            marginTop:     'var(--fib-13)',
            lineHeight:    1.5,
          }}
        >
          {t('tagline')}
        </p>
      </div>

      {/* Stadt (Spalten 5–7) */}
      <div
        style={{
          gridColumn:  '5 / 8',
          fontFamily:  'var(--font-inter)',
          fontSize:    'var(--fib-13)',
          color:       'var(--color-stone)',
          letterSpacing: '0.05em',
        }}
      >
        {t('city')}
      </div>

      {/* Links (Spalten 9–12) */}
      <nav
        style={{
          gridColumn:  '9 / 13',
          display:     'flex',
          flexDirection: 'column',
          gap:         'var(--fib-8)',
          fontFamily:  'var(--font-inter)',
          fontSize:    'var(--fib-13)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <Link href="/geschichte">{t('history')}</Link>
        <Link href="/kultur">{t('culture')}</Link>
      </nav>
    </footer>
  )
}
