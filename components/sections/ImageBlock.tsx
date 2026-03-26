import Image from 'next/image'

interface ImageBlockProps {
  src:     string
  alt:     string
  /** Höhe in px (Default: 60vh) */
  height?: string
  /** Horizontale Ausrichtung des Bildinhalts */
  position?: string
}

/**
 * Einzelbild, ausschliesslich im geometrischen Raster verankert.
 * Füllt die gesamte Viewport-Breite (kein Fibonacci-Padding).
 */
export default function ImageBlock({
  src,
  alt,
  height    = '60vh',
  position  = 'center center',
}: ImageBlockProps) {
  return (
    <div
      style={{
        width:    '100%',
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: position }}
      />
    </div>
  )
}
