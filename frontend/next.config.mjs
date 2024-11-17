import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co", "img.daisyui.com", "img.freepik.com"],
  },
};

export default withNextIntl(nextConfig);
