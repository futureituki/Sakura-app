const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeFonts: true,
  },
}
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([withBundleAnalyzer], {
  /* オプション設定 */
  nextConfig,
})
