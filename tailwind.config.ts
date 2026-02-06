
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, hsl(var(--primary) / 0.1) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid-size': '2rem 2rem',
      },
      fontFamily: {
        body: ['"PT Sans"', 'sans-serif'],
        headline: ['"Playfair Display"', 'serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'globe-spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        'globe-rotate-1': {
          '0%': { transform: 'rotateX(65deg) rotateY(15deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(65deg) rotateY(15deg) rotateZ(360deg)' },
        },
        'globe-rotate-2': {
          '0%': { transform: 'rotateX(65deg) rotateY(30deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(65deg) rotateY(30deg) rotateZ(360deg)' },
        },
        'globe-rotate-3': {
          '0%': { transform: 'rotateX(65deg) rotateY(45deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(65deg) rotateY(45deg) rotateZ(360deg)' },
        },
        'pan': {
            '0%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '100% 100%' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(2)', opacity: '0.5' },
        },
        'draw-arc': {
          'to': { strokeDashoffset: 'var(--dashoffset)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'globe-spin': 'globe-spin 30s linear infinite',
        'globe-rotate-1': 'globe-rotate-1 40s linear infinite',
        'globe-rotate-2': 'globe-rotate-2 25s linear infinite reverse',
        'globe-rotate-3': 'globe-rotate-3 30s linear infinite',
        'pan': 'pan 30s linear infinite alternate',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'draw-arc': 'draw-arc 5s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

    