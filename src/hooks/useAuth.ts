import { useContext } from 'react';
import { AuthContext } from '../context/authContextDefinition';
import type { AuthContextValue } from '../types';

/**
 * Hook para acessar o AuthContext
 *
 * @returns Objeto com dados do usuário e funções de autenticação
 * @throws Error se usado fora do AuthProvider
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
