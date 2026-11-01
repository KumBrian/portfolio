import type { Config } from 'tailwindcss'

export default {
  content: [
    './presentation/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1a1a2e',
          fiverr: '#1DBF73',
        },
      },
    },
  },
} satisfies Config
