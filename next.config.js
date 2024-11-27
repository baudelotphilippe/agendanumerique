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
      {
        protocol: 'https',
        hostname: 'emf.fr'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'secure-content.meetupstatic.com'
      },     
      {
        protocol: 'https',
        hostname: 'secure.meetupstatic.com'
      }
    ],
  },
}

export default nextConfig
