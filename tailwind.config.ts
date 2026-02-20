import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        background: '#F5EFE6',   // Soft Beige
        primary: '#A97142',    // Deep Caramel
        secondary: '#4A3426',  // Chocolate Brown
        accent: '#C6A75E',      // Soft Gold
        ink: '#2B1E17',        // Dark Espresso (text)
        sand: {
          50: '#F5EFE6',       // Soft Beige
          100: '#EDE4D9',
          200: '#E0D4C4',
        },
        blush: {
          200: '#e8d2c9',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: [],
} satisfies Config
