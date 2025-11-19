import { createContext } from 'react';
import type { ThemeContextValue } from '../types';

/**
 * Context para gerenciamento de tema da aplicação
 * Permite alternar entre tema claro e escuro com persistência no localStorage
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
