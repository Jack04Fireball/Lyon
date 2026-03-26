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
