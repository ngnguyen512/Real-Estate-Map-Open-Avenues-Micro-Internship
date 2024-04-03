/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
           protocol: "http",
           hostname: "upload.wikimedia.org",
         },
        ],
     },
};


export default nextConfig;