import { useState, useEffect, useCallback } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/**
 * Componente SearchBar que demonstra useDebounce hook
 * Implementa busca em tempo real com debounce para otimizar performance
 */
function SearchBar({
  onSearch,
  placeholder = 'Digite para buscar...',
  debounceMs = 500,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Calcula isSearching diretamente sem useEffect
  const isSearching = searchTerm !== debouncedSearchTerm;

  useEffect(() => {
    // Executa a busca apenas quando o termo debounced muda
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <div className={styles.searchBar}>
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Campo de busca"
          />
          {searchTerm && (
            <button
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Limpar busca"
              type="button"
            >
              ✕
            </button>
          )}
        </div>
        <button
          className={styles.searchIcon}
          aria-label="Buscar"
          type="button"
        >
          🔍
        </button>
      </div>

      {searchTerm && (
        <div className={styles.results}>
          <div className={styles.resultsTitle}>
            {isSearching ? 'Buscando...' : 'Resultado da busca'}
          </div>
          <div className={styles.resultsContent}>
            {isSearching ? (
              <div className={styles.searching}>
                <span className={styles.spinner}></span>
                <span>Aguardando digitação...</span>
              </div>
            ) : debouncedSearchTerm ? (
              <div>
                Buscando por: <strong>"{debouncedSearchTerm}"</strong>
              </div>
            ) : (
              <div className={styles.noResults}>
                Digite algo para buscar
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.info}>
        💡 Este componente usa debounce de {debounceMs}ms para otimizar a
        busca. Experimente digitar rapidamente e observe que a busca só é
        executada após você parar de digitar.
      </div>
    </div>
  );
}

export default SearchBar;
