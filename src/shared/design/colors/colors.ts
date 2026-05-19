const SEMANTIC_ERROR = '#FF385C';

/** Базовая палитра (design tokens). */
export const colors = {
  background: {
    primary: '#1B1C2D',
    accent: '#CFFF57',
    reduced: '#131420',
    surface: '#FFFFFF',
  },
  text: {
    primary: '#FFFFFFF2',
    secondary: '#FFFFFF99',
    dark: '#0A0A10',
  },
  semantic: {
    error: SEMANTIC_ERROR,
  },
  gradient: {
    start: SEMANTIC_ERROR,
    end: '#1B1C2D',
  },
} as const;
