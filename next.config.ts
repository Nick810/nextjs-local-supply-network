import createMDX from '@next/mdx'
 
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
    ],
    qualities: [75, 85, 100]
  },
}
 
const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
})
 
// @ts-expect-error "it's bullshit"
// Merge MDX config with Next.js config
export default withMDX(nextConfig)