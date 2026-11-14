/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Human Pro Enterprise Dark Palette (Linear / Vercel / GitHub Dark)
        canvas: '#090D16',       // Deepest dark background
        panel: '#0E1422',        // Primary card/surface container
        'panel-subtle': '#141C2E', // Secondary surface (inputs, nested tables)
        'panel-hover': '#1A243A',  // Hover states
        line: '#1E293F',         // Hairline borders
        'line-subtle': '#162032',  // Subtle internal dividers
        
        // Brand & Accents
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          subtle: 'rgba(59, 130, 246, 0.12)',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          subtle: 'rgba(6, 182, 212, 0.12)',
        },
        emerald: {
          DEFAULT: '#10B981',
          subtle: 'rgba(16, 185, 129, 0.12)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          subtle: 'rgba(245, 158, 11, 0.12)',
        },
        rose: {
          DEFAULT: '#F43F5E',
          subtle: 'rgba(244, 63, 94, 0.12)',
        },
        
        // Text hierarchy
        fg: {
          primary: '#F8FAFC',    // 100% white-adjacent
          secondary: '#94A3B8',  // readable muted text
          muted: '#64748B',      // tertiary helper text
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.04)',
      }
    },
  },
  plugins: [],
}
