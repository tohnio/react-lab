import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';
import Button from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component - Captura erros de renderização em componentes filhos
 *
 * Implementa o método componentDidCatch do React para capturar erros
 * que ocorrem durante a renderização, em métodos de ciclo de vida,
 * e em construtores de toda a árvore de componentes abaixo dele.
 *
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * @example
 * // Com fallback customizado
 * <ErrorBoundary fallback={<div>Algo deu errado</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Atualiza o estado quando um erro é capturado
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Captura informações sobre o erro e loga para debugging
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log do erro para debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Atualiza o estado com informações detalhadas do erro
    this.setState({
      error,
      errorInfo,
    });

    // Aqui você poderia enviar o erro para um serviço de logging
    // como Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo);
  }

  /**
   * Reseta o estado de erro e tenta renderizar novamente
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Se um fallback customizado foi fornecido, usa ele
      if (fallback) {
        return fallback;
      }

      // UI de fallback padrão
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h1 className={styles.errorTitle}>Oops! Algo deu errado</h1>
            <p className={styles.errorMessage}>
              Desculpe, ocorreu um erro inesperado. Por favor, tente novamente.
            </p>

            {error && (
              <details className={styles.errorDetails}>
                <summary className={styles.errorSummary}>
                  Detalhes do erro (para desenvolvedores)
                </summary>
                <div className={styles.errorContent}>
                  <p className={styles.errorName}>
                    <strong>Erro:</strong> {error.toString()}
                  </p>
                  {errorInfo && (
                    <pre className={styles.errorStack}>
                      <strong>Stack trace:</strong>
                      {errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className={styles.errorActions}>
              <Button onClick={this.handleReset} variant="primary">
                Tentar novamente
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="secondary"
              >
                Voltar para Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
