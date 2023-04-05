/** @type {import('next').NextConfig} */
const config = {
    experimental: {
        appDir: true,
    },
    reactStrictMode: true,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        domains: [
            "images.clerk.dev",
            "cdn.shopify.com",
            "www.docker.com",
            "media.licdn.com", // linkedin :P
        ],
    },
};

export default config;

