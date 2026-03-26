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
    <div
      style={{
        display:    'flex',
        gap:        'var(--fib-8)',
        fontFamily: 'var(--font-inter)',
        fontSize:   'var(--fib-13)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      <button
        onClick={() => switchLocale('de')}
        style={{
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          fontFamily: 'inherit',
          fontSize:   'inherit',
          letterSpacing: 'inherit',
          textTransform: 'inherit',
          color:      locale === 'de' ? 'var(--color-text)' : 'var(--color-stone)',
          fontWeight: locale === 'de' ? 600 : 400,
          padding:    0,
        }}
      >
        DE
      </button>
      <span style={{ color: 'var(--color-stone)', userSelect: 'none' }}>/</span>
      <button
        onClick={() => switchLocale('fr')}
        style={{
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          fontFamily: 'inherit',
          fontSize:   'inherit',
          letterSpacing: 'inherit',
          textTransform: 'inherit',
          color:      locale === 'fr' ? 'var(--color-text)' : 'var(--color-stone)',
          fontWeight: locale === 'fr' ? 600 : 400,
          padding:    0,
        }}
      >
        FR
      </button>
    </div>
  )
}
