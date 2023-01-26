const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([withBundleAnalyzer], {
  /* オプション設定 */
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizeFonts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
})
