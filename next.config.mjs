/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/sw.js",
  swDest: "public/sw.js",
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['b22wobhlmya1ixv3.public.blob.vercel-storage.com', "oaidalleapiprodscus.blob.core.windows.net", "tong.visitkorea.or.kr"],
  },
};

export default withSerwist(nextConfig);
