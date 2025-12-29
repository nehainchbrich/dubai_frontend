/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['admin.inchbrick.com', 'ip-api.com', 'cdn.inchbrick.com', 'localhost:5000', 'images.unsplash.com'],
  },
  env: {
    API_URL: "https://cdn.inchbrick.com",
    G_Map_API: "AIzaSyCecadpsUjXVRD50CiQRR4iTndOMXL2T60",
    DOMAIN: "https://inchbrick.com",
  },
  async redirects() {
    return [
      {
        source: '/blogs/guide-for-best-property-investment-in-dubai', // Old URL
        destination: '/blogs/best-property-investment-in-dubai', // New URL
        permanent: true, // 301 redirect
      },
      {
        source: '/top-real-estate-developer-in-dubai/binghatti-2', // Old URL with dynamic segments
        destination: '/top-real-estate-developer-in-dubai/binghatti', // New URL with dynamic segments
        permanent: true, // 301 redirect
      },
      {
        source: '/events/dubai-real-estate-expo-in-indore',
        destination: '/events/dubai-property-expo-hyderabad',
        permanent: true,
      },
      {
        source: '/events/hyderabad-4th-season',
        destination: '/events/dubai-property-expo-hyderabad',
        permanent: true,
      },
      {
        source: '/events/dubai-real-estate-expo-in-hyderabad',
        destination: '/events/dubai-property-expo-hyderabad',
        permanent: true,
      }
    ];
  },
}

module.exports = nextConfig
