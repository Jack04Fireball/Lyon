'use client'

import { useGridOverlay } from './GridOverlayProvider'
import { GEO_OVERLAY_COLOR, FIB_OVERLAY_COLOR, FIB_VALUES_OVERLAY } from './grid-config'

// Kumulierte Fibonacci-Positionen für horizontale Linien
function buildFibLines(values: number[]): number[] {
  const lines: number[] = []
  let acc = 0
  for (const v of values) {
    acc += v
    lines.push(acc)
    if (acc > 4000) break // Viewport-Grenze
  }
  return lines
}

export default function GridOverlay() {
  const { isVisible, toggle } = useGridOverlay()
  const fibLines = buildFibLines(FIB_VALUES_OVERLAY)

  return (
    <>
      {/* Toggle-Button: fixiert, unten rechts */}
      <button
        onClick={toggle}
        aria-label="Raster-Overlay ein-/ausblenden"
        style={{
          position:    'fixed',
          bottom:      'var(--fib-34)',
          right:       'var(--fib-34)',
          zIndex:      9999,
          padding:     `var(--fib-8) var(--fib-13)`,
          background:  isVisible ? 'var(--color-text)' : 'var(--color-ground)',
          color:       isVisible ? 'var(--color-ground)' : 'var(--color-text)',
          border:      '1px solid var(--color-text)',
          fontFamily:  'var(--font-inter)',
          fontSize:    'var(--fib-13)',
          letterSpacing: '0.12em',
          cursor:      'pointer',
          transition:  'background 0.15s, color 0.15s',
        }}
      >
        RASTER
      </button>

      {isVisible && (
        <>
          {/* Layer A: Geometrisches Raster (grüne Spalten) */}
          <div
            aria-hidden
            style={{
              position:            'fixed',
              inset:               0,
              zIndex:              9990,
              pointerEvents:       'none',
              display:             'grid',
              gridTemplateColumns: 'repeat(var(--geo-cols), 1fr)',
              gap:                 'var(--geo-gutter)',
              paddingInline:       'var(--geo-margin)',
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: `${GEO_OVERLAY_COLOR}18`,
                  outline:    `1px solid ${GEO_OVERLAY_COLOR}88`,
                }}
              />
            ))}
          </div>

          {/* Layer B: Fibonacci-Raster (blaue horizontale Linien) */}
          <div
            aria-hidden
            style={{
              position:      'fixed',
              inset:         0,
              zIndex:        9991,
              pointerEvents: 'none',
              overflow:      'hidden',
            }}
          >
            {fibLines.map((pos, i) => (
              <div
                key={i}
                style={{
                  position:   'absolute',
                  top:        `${pos}px`,
                  left:       0,
                  right:      0,
                  height:     '1px',
                  background: FIB_OVERLAY_COLOR,
                  opacity:    0.55,
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}
