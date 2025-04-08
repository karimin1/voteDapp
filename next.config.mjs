/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      electron: false, // 👈 Prevents 'electron' module issues
      // "electron-fetch": false, // 👈 Avoids loading 'electron-fetch'
       fs: false, // 👈 Prevents 'fs' module issues
      // path: false, // 👈 Prevents 'path' module issues
    };
    return config;
  },
};

export default nextConfig;
