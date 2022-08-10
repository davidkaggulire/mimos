/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com', 'mimose.herokuapp.com', 'localhost'],
  },
}

module.exports = nextConfig
