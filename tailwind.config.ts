import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#452B1F',
        accent: '#8B0A1A',
        // accent: "#C95E43",
        'secondary-accent': '#B3906E',
        text: '#723e29',
        'neutral-white': '#FDF9F8',
        'neutral-black': '#240404',
      },
      backgroundImage: {
        'hero-bg': "url(/coffee-beans.png)"
      }
    },
  },
  plugins: [],
};
export default config;
