/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cobaltpoitiers.fr'
      },
      {
        protocol: 'https',
        hostname: 'cibul.s3.amazonaws.com'
      },
      {
        protocol: 'http',
        hostname: 'pwn-association.org'
      },
      
    ],
  },
}

module.exports = nextConfig
