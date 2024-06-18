/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/sw.js",
  swDest: "public/sw.js",
});

const nextConfig = {
  images: {
    domains: ['b22wobhlmya1ixv3.public.blob.vercel-storage.com'],
  },
};

export default withSerwist(nextConfig);
