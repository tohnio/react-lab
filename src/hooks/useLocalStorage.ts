import { useState, useEffect } from 'react';

/**
 * Custom hook para sincronizar estado com localStorage
 * @param key - Chave do localStorage
 * @param initialValue - Valor inicial se não houver valor no localStorage
 * @returns [valor, função setter] - Tupla com valor atual e função para atualizar
 *
 * @example
 * const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  // Passa função inicial para useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Busca do localStorage pela chave
      const item = window.localStorage.getItem(key);
      // Parse do JSON armazenado ou retorna initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Retorna uma versão wrapped da função setter do useState que...
  // ...persiste o novo valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para ter a mesma API do useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Salva o estado
      setStoredValue(valueToStore);

      // Salva no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Sincroniza com mudanças no localStorage de outras abas/janelas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
