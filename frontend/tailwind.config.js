/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
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
          custom2: '#8278c4',
        },
        gray: {
          hover: '#f3f4f6',
          active: '#e5e7eb',
          subtext: '#6c727f',
          subtext2: '#e0e0e0',
          subtext3: '#434343',
          input: '#c2c2c2',
          divider: '#e5e7eb',
          background: '#dadada',
          custom: '#424242',
        },
        blue: {
          custom: '#6592BB',
        },
        yellow: {
          custom: '#CDD47B',
        },
        orange: {
          custom: '#DAA95F',
        },
        pink: {
          custom: '#CE83B9',
        },
      },
    },
  },
  plugins: [],
};
