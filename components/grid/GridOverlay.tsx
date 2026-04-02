'use client'

import { useEffect, useState } from 'react'
import { buildGeometricColumnLines, buildGeometricRowLines } from '@/lib/grid/geometric'
import { buildRepeatingFibLines } from '@/lib/grid/fibonacci'
import { useGridOverlay } from './GridOverlayProvider'
import {
  GEO_OVERLAY_COLOR,
  FIB_OVERLAY_COLOR,
  FIB_PATTERN_DESKTOP,
  FIB_PATTERN_TABLET,
  FIB_PATTERN_MOBILE,
} from './grid-config'

interface OverlayLines {
  geoVertical: number[]
  geoHorizontal: number[]
  fibVertical: number[]
  fibHorizontal: number[]
}

function resolveCssVarValue(rawValue: string, styles: CSSStyleDeclaration, depth = 0): string {
  if (depth > 6) return rawValue
  const trimmed = rawValue.trim()
  const match = /^var\((--[^,\s)]+)(?:,\s*(.+))?\)$/.exec(trimmed)
  if (!match) return trimmed

  const [, varName, fallback] = match
  const resolved = styles.getPropertyValue(varName).trim()
  if (resolved) {
    return resolveCssVarValue(resolved, styles, depth + 1)
  }
  if (fallback) {
    return resolveCssVarValue(fallback, styles, depth + 1)
  }
  return trimmed
}

function cssLengthToPx(value: string, rootFontPx: number): number {
  const trimmed = value.trim()
  if (!trimmed) return 0

  if (trimmed.endsWith('rem')) {
    const n = Number.parseFloat(trimmed.replace('rem', ''))
    return Number.isFinite(n) ? n * rootFontPx : 0
  }
  if (trimmed.endsWith('px')) {
    const n = Number.parseFloat(trimmed.replace('px', ''))
    return Number.isFinite(n) ? n : 0
  }

  const asNumber = Number.parseFloat(trimmed)
  return Number.isFinite(asNumber) ? asNumber : 0
}

function readLengthVarPx(varName: string, styles: CSSStyleDeclaration, rootFontPx: number): number {
  const raw = styles.getPropertyValue(varName).trim()
  const resolved = resolveCssVarValue(raw, styles)
  return cssLengthToPx(resolved, rootFontPx)
}

function readNumberVar(varName: string, styles: CSSStyleDeclaration, fallback: number): number {
  const raw = styles.getPropertyValue(varName).trim()
  const resolved = resolveCssVarValue(raw, styles)
  const parsed = Number.parseInt(resolved, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export default function GridOverlay() {
  const { isVisible, toggle } = useGridOverlay()
  const [lines, setLines] = useState<OverlayLines>({
    geoVertical: [],
    geoHorizontal: [],
    fibVertical: [],
    fibHorizontal: [],
  })

  useEffect(() => {
    function updateLines() {
      const styles = getComputedStyle(document.documentElement)
      const rootFontPx = Number.parseFloat(styles.fontSize) || 16

      const geoCols = readNumberVar('--geo-cols', styles, 12)
      const geoGutterPx = readLengthVarPx('--geo-gutter', styles, rootFontPx)
      const geoMarginPx = readLengthVarPx('--geo-margin', styles, rootFontPx)
      const geoRowPx = readLengthVarPx('--geo-row', styles, rootFontPx)
      const geoRowGapPx = readLengthVarPx('--geo-row-gap', styles, rootFontPx)

      const fibPattern = geoCols >= 12
        ? FIB_PATTERN_DESKTOP
        : geoCols >= 8
          ? FIB_PATTERN_TABLET
          : FIB_PATTERN_MOBILE
      const fibStepValuesPx = fibPattern.map(step => readLengthVarPx(`--fib-${step}`, styles, rootFontPx))
      const width = window.innerWidth
      const height = window.innerHeight

      setLines({
        geoVertical: buildGeometricColumnLines(width, geoCols, geoGutterPx, geoMarginPx),
        geoHorizontal: buildGeometricRowLines(height, geoRowPx, geoRowGapPx, geoMarginPx),
        fibVertical: buildRepeatingFibLines(
          fibStepValuesPx,
          Math.max(0, width - geoMarginPx),
          geoMarginPx,
        ),
        fibHorizontal: buildRepeatingFibLines(
          fibStepValuesPx,
          Math.max(0, height - geoMarginPx),
          geoMarginPx,
        ),
      })
    }

    updateLines()
    window.addEventListener('resize', updateLines)
    return () => window.removeEventListener('resize', updateLines)
  }, [])

  function renderVerticalLines(values: number[], color: string, zIndex: number, dashed = false) {
    return (
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {values.map((x, i) => (
          <div
            key={`${zIndex}-vx-${i}`}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${x}px`,
              width: '1px',
              background: dashed ? 'transparent' : color,
              borderLeft: dashed ? `1px dashed ${color}` : undefined,
              opacity: dashed ? 0.45 : 0.65,
            }}
          />
        ))}
      </div>
    )
  }

  function renderHorizontalLines(values: number[], color: string, zIndex: number, dashed = false) {
    return (
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {values.map((y, i) => (
          <div
            key={`${zIndex}-hy-${i}`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${y}px`,
              height: '1px',
              background: dashed ? 'transparent' : color,
              borderTop: dashed ? `1px dashed ${color}` : undefined,
              opacity: dashed ? 0.45 : 0.65,
            }}
          />
        ))}
      </div>
    )
  }

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
        RASTER 2D
      </button>

      {isVisible && (
        <>
          {/* Geometrisches Raster: vertikal + horizontal */}
          {renderVerticalLines(lines.geoVertical, GEO_OVERLAY_COLOR, 9990)}
          {renderHorizontalLines(lines.geoHorizontal, GEO_OVERLAY_COLOR, 9991)}

          {/* Fibonacci-Raster: vertikal + horizontal */}
          {renderVerticalLines(lines.fibVertical, FIB_OVERLAY_COLOR, 9992, true)}
          {renderHorizontalLines(lines.fibHorizontal, FIB_OVERLAY_COLOR, 9993, true)}
        </>
      )}
    </>
  )
}
