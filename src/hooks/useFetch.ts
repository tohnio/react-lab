import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Interface para o resultado do hook useFetch
 */
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Cache em memória para armazenar respostas de requisições
 * Evita requisições duplicadas para a mesma URL
 */
const cache = new Map<string, any>();

/**
 * Custom hook para fazer requisições HTTP com gerenciamento de estado
 * Inclui cache básico para evitar requisições duplicadas
 *
 * @param url - URL para fazer a requisição
 * @param options - Opções do fetch (opcional)
 * @returns Objeto com data, loading, error e função refetch
 *
 * @example
 * const { data, loading, error, refetch } = useFetch<Post[]>('https://api.example.com/posts');
 *
 * if (loading) return <Loading />;
 * if (error) return <div>Error: {error.message}</div>;
 * return <div>{data?.map(post => <Post key={post.id} {...post} />)}</div>;
 */
function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Ref para rastrear se o componente está montado
  // Previne atualizações de estado em componentes desmontados
  const isMounted = useRef(true);

  // Função para fazer a requisição
  const fetchData = useCallback(async () => {
    // Verifica se há dados em cache
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Apenas atualiza o estado se o componente ainda estiver montado
      if (isMounted.current) {
        setData(result);
        // Armazena no cache
        cache.set(url, result);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setLoading(false);
      }
    }
  }, [url, options]);

  // Executa a requisição quando o componente monta ou a URL muda
  useEffect(() => {
    isMounted.current = true;
    fetchData();

    // Cleanup: marca o componente como desmontado
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  // Função para refazer a requisição manualmente
  const refetch = useCallback(() => {
    // Remove do cache para forçar nova requisição
    cache.delete(url);
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch };
}

export default useFetch;
