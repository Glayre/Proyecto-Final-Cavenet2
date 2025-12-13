/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cavenetBlue: "#004aad",
        cavenetIndigo: "#3b82f6",
        cavDark: "#1a1a1a",
        cavGray: "#f3f4f6",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Courier New", "monospace"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
