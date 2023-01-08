/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          custom: '#85BB65',
        },
        red: {
          custom: '#BB6565',
          custom2: '#975252',
        },
        purple: {
          custom: '#7165BB',
        },
      },
    },
  },
  plugins: [],
};
