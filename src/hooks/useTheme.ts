import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextDefinition';
import type { ThemeContextValue } from '../types';

/**
 * Hook para acessar o ThemeContext
 *
 * @returns Objeto com tema atual e função para alternar tema
 * @throws Error se usado fora do ThemeProvider
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
