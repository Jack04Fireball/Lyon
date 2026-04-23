import Logo from './Logo'

interface BrandLockupProps {
  markSize?: number
  compact?: boolean
  invert?: boolean
}

export default function BrandLockup({ markSize = 34, compact = false, invert = false }: BrandLockupProps) {
  const markColor = invert ? 'var(--color-ivory)' : 'var(--color-violet)'
  const toneClass = invert ? ' is-invert' : ''

  return (
    <span className={`brand-lockup${compact ? ' is-compact' : ''}${toneClass}`}>
      <span className="brand-lockup__mark" aria-hidden="true">
        <Logo size={markSize} color={markColor} />
      </span>
      <span className="brand-lockup__text" aria-label="Ville de Lyon">
        <span>VILLE</span>
        <span>DE LYON</span>
      </span>
    </span>
  )
}
