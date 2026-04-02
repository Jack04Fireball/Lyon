// Zentrale Konfiguration für beide Rastersysteme
export const GEO_OVERLAY_COLOR = '#16a34a'  // grün
export const FIB_OVERLAY_COLOR = '#2563eb'  // blau

// Fibonacci-Sequenzen pro Breakpoint (als Tokenwerte, später in px aufgelöst)
export const FIB_PATTERN_DESKTOP = [8, 13, 21, 34, 55, 89, 144, 233, 144, 89, 55, 34, 21, 13] as const
export const FIB_PATTERN_TABLET = [8, 13, 21, 34, 55, 34, 21, 13] as const
export const FIB_PATTERN_MOBILE = [8, 13, 21, 34, 21, 13] as const
