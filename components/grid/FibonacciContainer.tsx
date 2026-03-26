interface FibonacciContainerProps {
  children: React.ReactNode
  /** Max-Breite via Fibonacci-Var (z.B. '--fib-233') */
  maxWidth?: string
  paddingX?: string
  paddingY?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Container für alle Textelemente und Typografie.
 * Richtet sich ausschliesslich am Fibonacci-Raster aus.
 * Niemals Grid-Columns hier verwenden.
 */
export default function FibonacciContainer({
  children,
  maxWidth = 'var(--fib-233)',
  paddingX = 'var(--fib-34)',
  paddingY = 'var(--fib-55)',
  className,
  style,
}: FibonacciContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        paddingInline: paddingX,
        paddingBlock:  paddingY,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
