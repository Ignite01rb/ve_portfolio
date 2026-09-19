/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'comic-red': '#B81424',
        'comic-red-bright': '#E52535',
        'comic-yellow': '#FFDD00',
        'comic-blue': '#00A4E4',
        'comic-cyan': '#00FFFF',
        'comic-magenta': '#FF00FF',
        'comic-dark': '#121212',
        'cinematic-bg': '#B81424',
        'cinematic-card': '#FFFFFF',
        'cinematic-border': '#000000',
        'gold-accent': '#FFDD00',
      },
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        comic: ['Comic Neue', 'cursive', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
        heading: ['Bangers', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Comic Neue', 'sans-serif'],
        accent: ['Permanent Marker', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'float-slow': 'float 4s ease-in-out infinite alternate',
        'float-reverse': 'float 4.5s ease-in-out infinite alternate-reverse',
        'pulse-gold': 'pulseGold 2s infinite',
        'pulse-green': 'pulseGreen 2s infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseGold: {
          '0%': { boxShadow: '0 0 0 0 rgba(229, 184, 105, 0.6)' },
          '70%': { boxShadow: '0 0 0 12px rgba(229, 184, 105, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(229, 184, 105, 0)' },
        },
        pulseGreen: {
          '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
        }
      }
    },
  },
  plugins: [],
}
