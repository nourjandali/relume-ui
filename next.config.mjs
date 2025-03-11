/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
};

export default nextConfig;
