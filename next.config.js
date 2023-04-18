/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: 'https://dev-api.gmco-event.com/v1/:path*',
      },
    ]
  },
  output: 'standalone',
  reactStrictMode: false,
}
  
