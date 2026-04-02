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
          gridTemplateColumns: 'repeat(var(--geo-cols), minmax(0, 1fr))',
          gridAutoRows: 'var(--geo-row)',
          columnGap: 'var(--geo-gutter)',
          rowGap: 'var(--geo-row-gap)',
          paddingInline: 'var(--geo-margin)',
        } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
