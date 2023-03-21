/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-color-1': 'var(--gray-color-1)',
        'red-color-1': 'var(--red-color-1)',
      },
    },
  },
  plugins: [],
};
