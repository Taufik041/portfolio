import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Design tokens - all keyed off CSS variables defined in globals.css
      colors: {
        canvas:    'var(--bg)',
        surface:   'var(--surface)',
        surface2:  'var(--surface-2)',
        ink:       'var(--text)',
        ink2:      'var(--text-2)',
        ink3:      'var(--text-3)',
        line:      'var(--border)',
        lineHard:  'var(--border-strong)',
        accent:    'var(--accent)',
        accentBg:  'var(--accent-weak)',
        accentFg:  'var(--accent-text)',
      },
      borderRadius: {
        card: '18px',
        btn:  '12px',
        pill: '980px',
      },
      keyframes: {
        drift: { to: { backgroundPosition: '240px 0' } },
        livepulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.35' },
        },
      },
      animation: {
        drift:     'drift 9s linear infinite',
        livepulse: 'livepulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
