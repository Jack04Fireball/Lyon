interface GeometricContainerProps {
  children: React.ReactNode
  /** Ob der Container selbst das Grid-Layout trägt (Standard: true) */
  asGrid?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Container für alle Bild- und Medienelemente.
 * Richtet sich ausschliesslich am geometrischen Raster aus.
 * Niemals Fibonacci-Werte hier verwenden.
 */
export default function GeometricContainer({
  children,
  asGrid = true,
  className,
  style,
}: GeometricContainerProps) {
  return (
    <div
      className={className}
      style={{
        ...(asGrid ? {
          display: 'grid',
          gridTemplateColumns: 'repeat(var(--geo-cols), 1fr)',
          gap: 'var(--geo-gutter)',
          paddingInline: 'var(--geo-margin)',
        } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
