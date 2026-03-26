import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/images/**' }],
  },
  turbopack: {
    root: __dirname,
  },
}

export default withNextIntl(nextConfig)
