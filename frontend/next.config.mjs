/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ar"], // List all available languages (English and Arabic in this case)
    defaultLocale: "en", // Default language of your app
    localeDetection: true, // Enable automatic locale detection based on the user's browser settings
  },
};

export default nextConfig;
