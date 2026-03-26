import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'

export default function Navigation() {
  const t = useTranslations('Nav')

  return (
    <header
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        zIndex:          100,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        paddingInline:   'var(--fib-34)',
        paddingBlock:    'var(--fib-21)',
        background:      'rgba(245, 240, 232, 0.92)',
        backdropFilter:  'blur(6px)',
        borderBottom:    '1px solid rgba(26, 24, 20, 0.07)',
      }}
    >
      {/* Links: Navigation in Inter */}
      <nav
        style={{
          display:       'flex',
          gap:           'var(--fib-34)',
          fontFamily:    'var(--font-inter)',
          fontSize:      'var(--fib-13)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <Link href="/" className="nav-link">{t('home')}</Link>
        <Link href="/geschichte" className="nav-link">{t('history')}</Link>
        <Link href="/kultur" className="nav-link">{t('culture')}</Link>
      </nav>

      {/* Rechts: Sprache + Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--fib-21)' }}>
        <LanguageToggle />
        <Link href="/" aria-label={t('home')}>
          <Logo size={32} />
        </Link>
      </div>
    </header>
  )
}
