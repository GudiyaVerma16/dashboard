/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        "background-alt": "#020617",
        primary: "#6366f1",
        "primary-soft": "#4f46e5",
        card: "#020617",
      },
    },
  },
  plugins: [],
};

