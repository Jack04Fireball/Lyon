'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/i18n/navigation'

export default function LanguageToggle() {
  const locale  = useLocale()
  const router  = useRouter()
  const pathname = usePathname()

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="lang-toggle">
      <button
        onClick={() => switchLocale('de')}
        className={`lang-toggle__btn${locale === 'de' ? ' is-active' : ''}`}
      >
        DE
      </button>
      <span className="lang-toggle__sep">/</span>
      <button
        onClick={() => switchLocale('fr')}
        className={`lang-toggle__btn${locale === 'fr' ? ' is-active' : ''}`}
      >
        FR
      </button>
    </div>
  )
}
