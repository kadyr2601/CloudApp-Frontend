/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  images: {
    domains: [
      "127.0.0.1"
    ],
  },
  env: {
    BASE_URL: 'http://127.0.0.1:8000/'
  }
}

module.exports = nextConfig
