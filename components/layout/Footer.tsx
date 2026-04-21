import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import Logo from './Logo'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo size={28} />
          <p className="footer-tagline">{t('tagline')}</p>
        </div>

        <p className="footer-city">{t('city')}</p>

        <nav className="footer-nav" aria-label="Footer">
          <Link href="/geschichte" className="footer-link">
            {t('history')}
          </Link>
          <Link href="/kultur" className="footer-link">
            {t('culture')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
