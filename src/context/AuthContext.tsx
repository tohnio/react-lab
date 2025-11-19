import type { ReactNode } from 'react';
import type { User, AuthContextValue } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthContext } from './authContextDefinition';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider do AuthContext
 * Gerencia o estado de autenticação do usuário com persistência
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // Persiste os dados do usuário no localStorage
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  /**
   * Simula login de usuário
   * Em uma aplicação real, isso faria uma chamada à API de autenticação
   *
   * @param email - Email do usuário
   * @param _password - Senha do usuário (não utilizada na simulação)
   */
  const login = async (email: string, _password: string): Promise<void> => {
    // Simula chamada de API com delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Autenticação mock - em app real, isso chamaria uma API
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Demo User')}`,
        };
        setUser(mockUser);
        resolve();
      }, 500);
    });
  };

  /**
   * Faz logout do usuário
   * Remove os dados do usuário do estado e localStorage
   */
  const logout = () => {
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
