/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        "avanda-grey": 'var(--avanda-grey)',
        "avanda-grey-dark": 'var(--avanda-grey-dark)',
        "main-purple": 'var(--main-purple)',
        "light-purple": 'var(--light-purple)',
        "get-request": "#06c125",
        "post-request": 'var(--post-request-yellow)',
        "delete-request": 'var(--delete-request-red)',
        "watchable-request": 'var(--watchable-request-blue)',

      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      }
    }
  },
  plugins: []
}
