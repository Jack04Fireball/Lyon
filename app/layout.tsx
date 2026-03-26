import type { Metadata } from 'next'
import { Spectral, Inter } from 'next/font/google'
import './globals.css'

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral-var',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lyon',
  description: 'Im Zusammenfluss entsteht Identität.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // lang wird per next-intl in den Seiten-Metadaten gesetzt
  return (
    <html className={`${spectral.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
