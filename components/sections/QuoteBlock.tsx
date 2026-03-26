interface QuoteBlockProps {
  text:   string
  /** Optional: kleiner Kontext-Text (Quelle, Epoche etc.) */
  label?: string
}

/**
 * Spectral-Zitat, verankert im Fibonacci-Raster.
 * Wird zwischen Epochen und Abschnitten verwendet.
 */
export default function QuoteBlock({ text, label }: QuoteBlockProps) {
  return (
    <div
      style={{
        paddingInline: 'var(--fib-55)',
        paddingBlock:  'var(--fib-89)',
        maxWidth:      '42ch',
      }}
    >
      <p
        style={{
          fontFamily:    'var(--font-spectral)',
          fontSize:      'clamp(1.5rem, 3vw, var(--fib-55))',
          fontWeight:    300,
          fontStyle:     'italic',
          lineHeight:    1.25,
          letterSpacing: '-0.01em',
          color:         'var(--color-text)',
        }}
      >
        „{text}"
      </p>
      {label && (
        <p
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      'var(--fib-13)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         'var(--color-stone)',
            marginTop:     'var(--fib-21)',
          }}
        >
          {label}
        </p>
      )}
    </div>
  )
}
