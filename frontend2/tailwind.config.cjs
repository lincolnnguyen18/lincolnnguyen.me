/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
          custom2: '#958EC2',
        },
        gray: {
          hover: '#f3f4f6',
          active: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
}
