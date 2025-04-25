/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: {
          50: 'var(--ecl-primary-50)',
          100: 'var(--ecl-primary-100)',
          200: 'var(--ecl-primary-200)',
          300: 'var(--ecl-primary-300)',
          400: 'var(--ecl-primary-400)',
          500: 'var(--ecl-primary-500)',
          600: 'var(--ecl-primary-600)',
          700: 'var(--ecl-primary-700)',
          800: 'var(--ecl-primary-800)',
          900: 'var(--ecl-primary-900)',
        },
        secondary: {
          50: 'var(--ecl-secondary-50)',
          100: 'var(--ecl-secondary-100)',
          200: 'var(--ecl-secondary-200)',
          300: 'var(--ecl-secondary-300)',
          400: 'var(--ecl-secondary-400)',
          500: 'var(--ecl-secondary-500)',
          600: 'var(--ecl-secondary-600)',
          700: 'var(--ecl-secondary-700)',
          800: 'var(--ecl-secondary-800)',
          900: 'var(--ecl-secondary-900)',
        },
        // Semantic colors
        success: {
          50: 'var(--ecl-success-50)',
          100: 'var(--ecl-success-100)',
          500: 'var(--ecl-success-500)',
          700: 'var(--ecl-success-700)',
        },
        warning: {
          50: 'var(--ecl-warning-50)',
          100: 'var(--ecl-warning-100)',
          500: 'var(--ecl-warning-500)',
          700: 'var(--ecl-warning-700)',
        },
        error: {
          50: 'var(--ecl-error-50)',
          100: 'var(--ecl-error-100)',
          500: 'var(--ecl-error-500)',
          700: 'var(--ecl-error-700)',
        },
        info: {
          50: 'var(--ecl-info-50)',
          100: 'var(--ecl-info-100)',
          500: 'var(--ecl-info-500)',
          700: 'var(--ecl-info-700)',
        },
        // Neutrals
        neutral: {
          50: 'var(--ecl-neutral-50)',
          100: 'var(--ecl-neutral-100)',
          200: 'var(--ecl-neutral-200)',
          300: 'var(--ecl-neutral-300)',
          400: 'var(--ecl-neutral-400)',
          500: 'var(--ecl-neutral-500)',
          600: 'var(--ecl-neutral-600)',
          700: 'var(--ecl-neutral-700)',
          800: 'var(--ecl-neutral-800)',
          900: 'var(--ecl-neutral-900)',
        },
      },
      spacing: {
        // Custom spacing variables
        xs: 'var(--ecl-spacing-xs)',
        sm: 'var(--ecl-spacing-sm)',
        md: 'var(--ecl-spacing-md)',
        lg: 'var(--ecl-spacing-lg)',
        xl: 'var(--ecl-spacing-xl)',
        '2xl': 'var(--ecl-spacing-2xl)',
        '3xl': 'var(--ecl-spacing-3xl)',
      },
      borderRadius: {
        // Custom border radius variables
        xs: 'var(--ecl-radius-xs)',
        sm: 'var(--ecl-radius-sm)',
        md: 'var(--ecl-radius-md)',
        lg: 'var(--ecl-radius-lg)',
        xl: 'var(--ecl-radius-xl)',
      },
      boxShadow: {
        // Custom shadow variables
        xs: 'var(--ecl-shadow-xs)',
        sm: 'var(--ecl-shadow-sm)',
        md: 'var(--ecl-shadow-md)',
        lg: 'var(--ecl-shadow-lg)',
        xl: 'var(--ecl-shadow-xl)',
      },
      fontFamily: {
        sans: ['var(--ecl-font-family-sans)', 'sans-serif'],
        mono: ['var(--ecl-font-family-mono)', 'monospace'],
      },
      fontSize: {
        xs: ['var(--ecl-font-size-xs)', { lineHeight: 'var(--ecl-line-height-xs)' }],
        sm: ['var(--ecl-font-size-sm)', { lineHeight: 'var(--ecl-line-height-sm)' }],
        base: ['var(--ecl-font-size-base)', { lineHeight: 'var(--ecl-line-height-base)' }],
        lg: ['var(--ecl-font-size-lg)', { lineHeight: 'var(--ecl-line-height-lg)' }],
        xl: ['var(--ecl-font-size-xl)', { lineHeight: 'var(--ecl-line-height-xl)' }],
        '2xl': ['var(--ecl-font-size-2xl)', { lineHeight: 'var(--ecl-line-height-2xl)' }],
        '3xl': ['var(--ecl-font-size-3xl)', { lineHeight: 'var(--ecl-line-height-3xl)' }],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
