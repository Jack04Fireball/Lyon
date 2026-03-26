interface LogoProps {
  size?: number
  color?: string
}

/**
 * Geometrische Bildmarke Lyon.
 * Inline SVG — scharf auf allen Auflösungen, kein externes Asset nötig.
 * Basiert auf der abstrakten Y/Z-Bildmarke aus dem Design Manual.
 */
export default function Logo({ size = 36, color = 'var(--color-text)' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 72"
      fill="none"
      aria-label="Lyon"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Linker Arm (oben links → Mitte) */}
      <polygon points="0,0 18,0 34,36 16,36" fill={color} />
      {/* Rechter Arm (oben rechts → Mitte) */}
      <polygon points="42,0 60,0 44,36 26,36" fill={color} />
      {/* Mittlerer Block mit diagonalem Schnitt */}
      <polygon points="14,40 46,40 46,54 38,54" fill={color} />
      <polygon points="22,54 46,54 46,72 14,72" fill={color} />
      {/* Diagonale durch den Block */}
      <polygon points="46,40 60,40 46,72 32,72" fill="var(--color-ground)" />
    </svg>
  )
}
