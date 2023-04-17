/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://dev.gmco-event.com/api/v1/:path*',
      },
    ]
  },
  output: 'standalone',
  reactStrictMode: false,
}
  
