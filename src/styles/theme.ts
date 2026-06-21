export const theme = {
  colors: {
    background: '#0a0d10',
    cardBackground: '#12171e',
    cardBackgroundHover: '#181e26',
    border: '#1f2937',
    borderFocus: '#10b981',
    textPrimary: '#f9fafb',
    textMuted: '#9ca3af',
    textAccent: '#10b981', // Neon/emerald text for main profit numbers
    textAccentGlow: 'rgba(16, 185, 129, 0.15)',
    error: '#f87171',
    warning: '#fbbf24',
    buttonBackground: '#10b981',
    buttonText: '#0a0d10',
    buttonHover: '#34d399',
    inputBackground: '#18202c',
    inputText: '#f9fafb',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    hero: '2.5rem',
    heroLarge: '3.5rem',
  },
  breakpoints: {
    mobile: '450px',
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
  },
  shadows: {
    glow: '0 0 15px rgba(16, 185, 129, 0.2)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    round: '9999px',
  },
};

export type Theme = typeof theme;
export default theme;
