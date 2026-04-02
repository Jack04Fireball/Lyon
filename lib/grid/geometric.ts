export const geometricBreakpoints = {
  desktop: { cols: 12, gutter: '--fib-21', margin: '--fib-34', row: '--fib-34', rowGap: '--fib-21' },
  tablet:  { cols: 8, gutter: '--fib-13', margin: '--fib-21', row: '--fib-21', rowGap: '--fib-13' },
  mobile:  { cols: 4, gutter: '--fib-8', margin: '--fib-13', row: '--fib-13', rowGap: '--fib-8' },
} as const

function clampPositive(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0
  return value
}

function uniqueSorted(values: number[]): number[] {
  const rounded = values.map(v => Math.round(v * 100) / 100)
  const unique = Array.from(new Set(rounded))
  return unique.sort((a, b) => a - b)
}

/**
 * Vertikale Linien für ein Spaltenraster.
 * Liefert die Startkanten der Spalten plus die rechte Abschlusskante.
 */
export function buildGeometricColumnLines(
  viewportWidthPx: number,
  cols: number,
  gutterPx: number,
  marginPx: number,
): number[] {
  const width = clampPositive(viewportWidthPx)
  const clampedCols = Math.max(1, Math.floor(cols))
  const clampedGutter = Math.max(0, gutterPx)
  const clampedMargin = Math.max(0, marginPx)
  const innerWidth = width - (clampedMargin * 2) - (clampedGutter * (clampedCols - 1))

  if (innerWidth <= 0) return []

  const colWidth = innerWidth / clampedCols
  const lines: number[] = [clampedMargin]

  for (let i = 0; i < clampedCols; i += 1) {
    const start = clampedMargin + (i * (colWidth + clampedGutter))
    lines.push(start)
  }

  lines.push(width - clampedMargin)
  return uniqueSorted(lines).filter(v => v >= 0 && v <= width)
}

/**
 * Horizontale Linien für ein Zeilenraster.
 * Liefert die Startkanten der Zeilen plus die untere Abschlusskante.
 */
export function buildGeometricRowLines(
  viewportHeightPx: number,
  rowPx: number,
  rowGapPx: number,
  marginPx: number,
): number[] {
  const height = clampPositive(viewportHeightPx)
  const clampedRow = clampPositive(rowPx)
  const clampedRowGap = Math.max(0, rowGapPx)
  const clampedMargin = Math.max(0, marginPx)
  const max = height - clampedMargin

  if (clampedRow <= 0 || max <= clampedMargin) return []

  const lines: number[] = [clampedMargin]
  const step = clampedRow + clampedRowGap
  let cursor = clampedMargin
  let guard = 0

  while (cursor < max && guard < 400) {
    cursor += step
    if (cursor >= max) break
    lines.push(cursor)
    guard += 1
  }

  lines.push(max)
  return uniqueSorted(lines).filter(v => v >= 0 && v <= height)
}
