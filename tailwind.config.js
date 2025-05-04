/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--primary-text)",
        secondary: "var(--secondary-text)",
      },
      backgroundColor: {
        primary: "var(--primary-bg)",
        secondary: "var(--secondary-bg)",
      },
    },
  },
  plugins: [],
};
