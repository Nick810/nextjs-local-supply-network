import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin';
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**', // Optional: allows all paths
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/**',
      },
    ],
    qualities: [75, 85, 100]
  },
}
 
const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
})

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');
 
// @ts-expect-error "it's bullshit"
// Merge MDX config with Next.js config
export default withNextIntl(withMDX(nextConfig));