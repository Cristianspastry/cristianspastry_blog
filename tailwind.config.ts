import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'rgb': 'rgb 3s infinite',
      },
      keyframes: {
        rgb: {
          '0%, 100%': { color: '#0000ff' }, // Blu
          '33%': { color: '#ff0000' },      // Rosso
          '66%': { color: '#00ff00' },      // Verde
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluModerato: '#00376e',
        bianco: '#FFFFFF',
        grigioChiaro: '#E5E7EB',
        grigioScuro: '#374151',
        primary: '#4a90e2', // Blu tenue
        secondary: '#d4a373', // Beige dorato
        textPrimary: '#333333', // Grigio scuro per il testo
        accent: '#ffeadb', // Beige pastello per accenti
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
        playfair_display: ["var(--font-playfair-display)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
