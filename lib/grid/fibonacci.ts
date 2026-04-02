export const fibonacciDesktop = [8, 13, 21, 34, 55, 89, 144, 233] as const
export const fibonacciTablet  = [8, 13, 21, 34] as const
export const fibonacciMobile  = [8, 13, 21] as const

export type FibValue = 8 | 13 | 21 | 34 | 55 | 89 | 144 | 233

export function fibVar(n: FibValue): string {
  return `var(--fib-${n})`
}

// Kumulierte Positionen für das Overlay (Summe der Fibonacci-Werte)
export function cumulativeFibPositions(values: readonly number[]): number[] {
  const positions: number[] = []
  let acc = 0
  for (const v of values) {
    acc += v
    positions.push(acc)
  }
  return positions
}

/**
 * Wiederholt eine Fibonacci-Schrittfolge entlang einer Achse
 * und gibt absolute Pixelpositionen zurück.
 */
export function buildRepeatingFibLines(
  stepValuesPx: readonly number[],
  axisLengthPx: number,
  startOffsetPx = 0,
): number[] {
  const max = Number.isFinite(axisLengthPx) ? axisLengthPx : 0
  const offset = Number.isFinite(startOffsetPx) ? startOffsetPx : 0
  const steps = stepValuesPx.filter(v => Number.isFinite(v) && v > 0)

  if (max <= 0 || steps.length === 0 || offset >= max) {
    return []
  }

  const lines: number[] = [offset]
  let acc = offset
  let index = 0
  let guard = 0

  while (acc < max && guard < 2000) {
    const step = steps[index % steps.length]
    acc += step
    if (acc >= max) break
    lines.push(acc)
    index += 1
    guard += 1
  }

  lines.push(max)
  const rounded = lines.map(v => Math.round(v * 100) / 100)
  const unique = Array.from(new Set(rounded)).sort((a, b) => a - b)

  // Zu dichte Linien wirken wie ein "Band" statt Raster.
  // Deshalb hier eine minimale Distanz zwischen benachbarten Linien.
  const minGapPx = 4
  const cleaned: number[] = []
  for (const line of unique) {
    if (cleaned.length === 0 || line - cleaned[cleaned.length - 1] >= minGapPx) {
      cleaned.push(line)
    }
  }
  return cleaned
}
