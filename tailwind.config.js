/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue'
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
        "get-request-green" : 'var(--get-request-green)',
        "post-request-yellow" : 'var(--post-request-yellow)',

      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      }
    }
  },
  plugins: []
}
