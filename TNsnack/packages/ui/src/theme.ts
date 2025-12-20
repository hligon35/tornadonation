export type ThemeTokens = {
  colors: {
    brandPrimary: string;
    brandSecondary: string;
    slate900: string;
    slate700: string;
    slate500: string;
    slate200: string;
    white: string;
    danger: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    h1: { fontSize: number; fontWeight: '700' | '800' };
    h2: { fontSize: number; fontWeight: '700' };
    body: { fontSize: number; fontWeight: '400' | '500' };
    mono: { fontSize: number; fontWeight: '500' };
  };
};

// Placeholder school colors + neutral slate; override later from real brand kit.
export const defaultTheme: ThemeTokens = {
  colors: {
    brandPrimary: '#0F172A',
    brandSecondary: '#2563EB',
    slate900: '#0F172A',
    slate700: '#334155',
    slate500: '#64748B',
    slate200: '#E2E8F0',
    white: '#FFFFFF',
    danger: '#B91C1C',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '800' },
    h2: { fontSize: 20, fontWeight: '700' },
    body: { fontSize: 16, fontWeight: '400' },
    mono: { fontSize: 14, fontWeight: '500' },
  },
};
