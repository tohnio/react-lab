import { useState, useEffect } from 'react';

/**
 * Custom hook para fazer debounce de valores
 * Útil para inputs de busca e outras situações onde queremos esperar
 * o usuário parar de digitar antes de executar uma ação
 *
 * @param value - Valor a ser debounced
 * @param delay - Delay em milissegundos (padrão: 500ms)
 * @returns Valor debounced
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // Executa busca apenas quando o usuário parar de digitar por 500ms
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  // Estado para armazenar o valor debounced
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Atualiza o valor debounced após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancela o timeout se o valor mudar (também na desmontagem do componente)
    // Isso previne que o valor debounced seja atualizado se outro valor chegar
    // dentro do período de delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Apenas re-chama o effect se value ou delay mudar

  return debouncedValue;
}

export default useDebounce;
