/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      'sans': ['"Nunito"', ...defaultTheme.fontFamily.sans]
    }
  },
};
export const plugins = [];

