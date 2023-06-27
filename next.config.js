/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['lukasz-store.eu.saleor.cloud']
  }
};

module.exports = nextConfig
