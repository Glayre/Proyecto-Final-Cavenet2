// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Escanea todos tus componentes
  ],
  theme: {
    extend: {
      colors: {
        cavGray: "#f5f5f5",   // Fondo claro
        cavDark: "#333333",   // Texto principal
        cavBlue: "#004AAD",   // Azul corporativo
        cavAccent: "#FF6B00", // Naranja acento
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],   // Fuente principal
        brand: ["Poppins", "sans-serif"] // Fuente secundaria
      },
      boxShadow: {
        cav: "0 4px 6px rgba(0,0,0,0.1)", // Sombra personalizada
      },
    },
  },
  plugins: [],
};
