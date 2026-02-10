/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--bg-main)',
          card: 'var(--bg-card)',
          text: 'var(--text-main)',
          subtext: 'var(--text-sub)',
          border: 'var(--border-main)',
          accent: 'var(--accent-main)',
          'accent-dim': 'var(--accent-dim)',
          'accent-glow': 'var(--accent-glow)',
        }
      },
      backgroundImage: {
         'theme-gradient': 'var(--accent-gradient)',
      }
    },
  },
  plugins: [],
}