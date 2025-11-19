import { createContext } from 'react';
import type { AuthContextValue } from '../types';

/**
 * Context para gerenciamento de autenticação
 * Fornece estado de autenticação e funções de login/logout
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
