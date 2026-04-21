'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/navigation'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'

export default function Navigation() {
  const t = useTranslations('Nav')
  const pathname = usePathname()

  return (
    <header className="nav-shell">
      <div className="shell nav-inner">
        <nav className="nav-primary" aria-label="Primary">
          <Link href="/" className={`nav-link nav-link--home${pathname === '/' ? ' nav-link--active' : ''}`}>
            {t('home')}
          </Link>
          <Link href="/geschichte" className={`nav-link${pathname === '/geschichte' ? ' nav-link--active' : ''}`}>
            {t('history')}
          </Link>
          <Link href="/kultur" className={`nav-link${pathname === '/kultur' ? ' nav-link--active' : ''}`}>
            {t('culture')}
          </Link>
        </nav>

        <div className="nav-meta">
          <LanguageToggle />
          <Link href="/" aria-label={t('home')} className="nav-logo">
            <Logo size={30} />
          </Link>
        </div>
      </div>
    </header>
  )
}
