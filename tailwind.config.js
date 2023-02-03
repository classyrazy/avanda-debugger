/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
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
        "get-request" : "#06c125",
        "post-request" : 'var(--post-request-yellow)',

      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      }
    }
  },
  plugins: []
}
