/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14151A',
        paper: '#FAF9F5',
        paperdim: '#F0EEE6',
        signal: '#FF4B3E',
        tape: '#1F6F5C',
        gold: '#E8AA42',
        line: '#DEDACD',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        bounce1: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        wave1: 'bounce1 1.1s ease-in-out infinite',
        wave2: 'bounce1 1.3s ease-in-out infinite 0.15s',
        wave3: 'bounce1 0.9s ease-in-out infinite 0.3s',
        wave4: 'bounce1 1.4s ease-in-out infinite 0.05s',
        wave5: 'bounce1 1.0s ease-in-out infinite 0.25s',
        'page-in': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-down': 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
