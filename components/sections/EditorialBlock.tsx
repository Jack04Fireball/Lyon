interface EditorialBlockProps {
  /** Optionales Obertitel-Label in Inter (Epoche, Kategorie etc.) */
  label?:    string
  title?:    string
  text:      string
  /** Fibonacci-Max-Breite für den Textblock */
  maxWidth?: string
  align?:    'left' | 'right'
}

/**
 * Redaktioneller Textblock, ausschliesslich im Fibonacci-Raster verankert.
 * Kein Bezug zu Bildspalten.
 */
export default function EditorialBlock({
  label,
  title,
  text,
  maxWidth = 'var(--fib-233)',
  align = 'left',
}: EditorialBlockProps) {
  return (
    <div
      style={{
        paddingInline: 'var(--fib-34)',
        paddingBlock:  'var(--fib-55)',
        maxWidth,
        marginInlineStart: align === 'right' ? 'auto' : undefined,
      }}
    >
      {label && (
        <p
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      'var(--fib-13)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-terracotta)',
            marginBottom:  'var(--fib-13)',
          }}
        >
          {label}
        </p>
      )}
      {title && (
        <h2
          style={{
            fontFamily:    'var(--font-spectral)',
            fontSize:      'clamp(1.5rem, 3.5vw, var(--fib-55))',
            fontWeight:    400,
            lineHeight:    1.15,
            letterSpacing: '-0.02em',
            marginBottom:  'var(--fib-21)',
          }}
        >
          {title}
        </h2>
      )}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize:   'var(--fib-13)',
          lineHeight: 1.75,
          color:      'var(--color-text)',
        }}
      >
        {text}
      </p>
    </div>
  )
}
