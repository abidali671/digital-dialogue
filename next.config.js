/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.cnn.com", "freepngimg.com", "images.ctfassets.net"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
