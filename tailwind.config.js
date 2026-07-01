/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: 'var(--color-cream)',
        cream2: 'var(--color-cream2)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        terracotta: 'var(--color-terracotta)',
        'terracotta-deep': 'var(--color-terracotta-deep)',
        sage: 'var(--color-sage)',
        'sage-deep': 'var(--color-sage-deep)',
        lavender: 'var(--color-lavender)',
        butter: 'var(--color-butter)',
        line: 'var(--color-line)',
        card: 'var(--color-card)',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        scroll: 'scroll 32s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
