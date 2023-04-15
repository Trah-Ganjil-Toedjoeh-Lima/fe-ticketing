/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.gmco-event.com/api/:path*',
      },
    ]
  },
  output: 'standalone',
  reactStrictMode: true,
}
  