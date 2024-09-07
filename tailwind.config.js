/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch'
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
