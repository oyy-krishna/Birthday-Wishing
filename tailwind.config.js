/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#88A788',
        accent: '#BAA5C3',
        cta: '#3D704D',
        neutral: '#ECE2D0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mobile': "url('/images/hero-mobile.jpg')",
        'hero-tablet': "url('/images/hero-tablet.jpg')",
        'hero-desktop': "url('/images/hero-desktop.jpg')",
      },
    },
  },
  plugins: [],
}
