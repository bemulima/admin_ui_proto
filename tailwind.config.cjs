/** @type {import('tailwindcss').Config} */
module.exports = {
  // Important: use class-based dark mode so the in-app toggle controls `dark:*` styles.
  // Tailwind's default is `media`, which makes dark styles follow OS preference and
  // makes a "moon/sun" toggle appear broken.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
