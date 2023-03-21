/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tv-schedules-app-color': 'var(--tv-schedules-app-color)',
      },
    },
  },
  plugins: [],
};
