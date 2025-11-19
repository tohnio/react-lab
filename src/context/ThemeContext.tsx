import { useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Theme, ThemeContextValue } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeContext } from './themeContextDefinition';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider do ThemeContext
 * Gerencia o tema da aplicação e persiste a preferência do usuário
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Usa useLocalStorage para persistir o tema selecionado
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    // Aplica o tema ao elemento root do documento via atributo data-theme
    // Isso permite que o CSS use seletores como [data-theme='dark']
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Alterna entre tema claro e escuro
   * Usa useCallback para evitar recriação da função em cada render
   */
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme: Theme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
