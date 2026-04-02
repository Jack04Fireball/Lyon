import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/lib/i18n/routing'
import { GridOverlayProvider } from '@/components/grid/GridOverlayProvider'
import GridOverlay from '@/components/grid/GridOverlay'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import DocumentLanguage from '@/components/layout/DocumentLanguage'

interface Props {
  children: React.ReactNode
  params:   Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  // Next.js 16: params ist async
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enables static rendering
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <DocumentLanguage />
      <GridOverlayProvider>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <GridOverlay />
      </GridOverlayProvider>
    </NextIntlClientProvider>
  )
}
