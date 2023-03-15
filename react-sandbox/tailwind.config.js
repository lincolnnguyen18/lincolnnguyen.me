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
          // gray-500
          subtext: '#6c727f',
          subtext2: '#e0e0e0',
          subtext3: '#BDBDBF',
          input: '#c2c2c2',
          input2: '#e5e7eb',
          // gray-200
          divider: '#e5e7eb',
          background: '#dadada',
          custom: '#BBBBBB',
          custom2: '#949494',
        },
        black: {
          custom: '#151517',
          custom2: '#1a1a1a',
        },
        blue: {
          custom: '#3b6cb8',
          custom2: '#4981de',
        },
      },
    },
  },
  plugins: [],
};
