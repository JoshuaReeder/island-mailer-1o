/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/for-business", destination: "/advertise", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
