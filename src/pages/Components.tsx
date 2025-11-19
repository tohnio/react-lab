import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Counter from '../components/features/Counter/Counter';
import TodoList from '../components/features/TodoList/TodoList';
import SearchBar from '../components/features/SearchBar/SearchBar';
import styles from './Components.module.css';

/**
 * Components page - Demonstra todos os componentes com exemplos interativos
 */
function Components() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchResults(query);
  };

  return (
    <div className={styles.components}>
      <header className={styles.header}>
        <Link to="/">
          <Button variant="secondary" size="sm">
            ← Voltar
          </Button>
        </Link>
        <h1>Componentes</h1>
        <p>Explore todos os componentes reutilizáveis do projeto</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componentes Comuns</h2>

        <Card title="Button Component" className={styles.demoCard}>
          <p className={styles.description}>
            Componente de botão com diferentes variantes, tamanhos e estados.
          </p>
          <div className={styles.demo}>
            <div className={styles.buttonGroup}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className={styles.buttonGroup}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className={styles.buttonGroup}>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </Card>

        <Card title="Card Component" className={styles.demoCard}>
          <p className={styles.description}>
            Componente de card flexível com título, conteúdo e footer opcional.
          </p>
          <div className={styles.demo}>
            <div className={styles.cardGrid}>
              <Card title="Card Simples">
                <p>Este é um card básico com apenas título e conteúdo.</p>
              </Card>
              <Card
                title="Card com Footer"
                footer={
                  <Button variant="primary" size="sm">
                    Ação
                  </Button>
                }
              >
                <p>Este card possui um footer com um botão de ação.</p>
              </Card>
            </div>
          </div>
        </Card>

        <Card title="Modal Component" className={styles.demoCard}>
          <p className={styles.description}>
            Modal com overlay, animações e suporte a teclado (ESC para fechar).
          </p>
          <div className={styles.demo}>
            <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
          </div>
        </Card>

        <Card title="Loading Component" className={styles.demoCard}>
          <p className={styles.description}>
            Spinner de loading com diferentes tamanhos e texto opcional.
          </p>
          <div className={styles.demo}>
            <div className={styles.loadingGroup}>
              <div className={styles.loadingItem}>
                <Loading size="sm" />
                <span>Small</span>
              </div>
              <div className={styles.loadingItem}>
                <Loading size="md" />
                <span>Medium</span>
              </div>
              <div className={styles.loadingItem}>
                <Loading size="lg" />
                <span>Large</span>
              </div>
            </div>
            <div className={styles.loadingWithText}>
              <Loading size="md" text="Carregando dados..." />
            </div>
          </div>
        </Card>

        <Card title="ErrorBoundary Component" className={styles.demoCard}>
          <p className={styles.description}>
            Captura erros de renderização e exibe uma UI de fallback amigável.
          </p>
          <div className={styles.demo}>
            <ErrorBoundary>
              <ErrorTrigger />
            </ErrorBoundary>
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componentes de Funcionalidades</h2>

        <Card title="Counter Component" className={styles.demoCard}>
          <p className={styles.description}>
            Contador interativo que demonstra useState e event handlers.
          </p>
          <div className={styles.demo}>
            <div className={styles.counterGrid}>
              <div>
                <h4>Contador Padrão</h4>
                <Counter />
              </div>
              <div>
                <h4>Contador com Step 5</h4>
                <Counter initialValue={10} step={5} />
              </div>
            </div>
          </div>
        </Card>

        <Card title="TodoList Component" className={styles.demoCard}>
          <p className={styles.description}>
            Lista de tarefas com CRUD completo e persistência no localStorage.
          </p>
          <div className={styles.demo}>
            <TodoList />
          </div>
        </Card>

        <Card title="SearchBar Component" className={styles.demoCard}>
          <p className={styles.description}>
            Barra de busca com debounce para otimizar performance.
          </p>
          <div className={styles.demo}>
            <SearchBar onSearch={handleSearch} placeholder="Buscar algo..." />
            {searchResults && (
              <div className={styles.searchResults}>
                <strong>Termo de busca atual:</strong> {searchResults}
              </div>
            )}
          </div>
        </Card>
      </section>

      <section className={styles.codeSection}>
        <Card title="💡 Dica">
          <p>
            Todos esses componentes são reutilizáveis e podem ser facilmente integrados em
            diferentes partes da aplicação. Eles seguem as melhores práticas do React, incluindo:
          </p>
          <ul>
            <li>✅ TypeScript para type safety</li>
            <li>✅ Props bem definidas e documentadas</li>
            <li>✅ CSS Modules para estilização isolada</li>
            <li>✅ Acessibilidade (ARIA labels)</li>
            <li>✅ Responsividade</li>
          </ul>
        </Card>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Exemplo de Modal"
        footer={
          <div className={styles.modalFooter}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirmar
            </Button>
          </div>
        }
      >
        <p>Este é um exemplo de modal funcional!</p>
        <p>Você pode:</p>
        <ul>
          <li>Clicar fora do modal para fechar</li>
          <li>Pressionar ESC para fechar</li>
          <li>Clicar no X no canto superior direito</li>
          <li>Usar os botões de ação no footer</li>
        </ul>
      </Modal>
    </div>
  );
}

/**
 * Componente auxiliar para demonstrar ErrorBoundary
 */
function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // Simula um erro de renderização
    throw new Error('Este é um erro de demonstração do ErrorBoundary!');
  }

  return (
    <div className={styles.errorTrigger}>
      <p>Clique no botão abaixo para simular um erro de renderização:</p>
      <Button variant="danger" onClick={() => setShouldError(true)}>
        Disparar Erro
      </Button>
      <p className={styles.hint}>
        💡 O ErrorBoundary capturará o erro e exibirá uma UI de fallback
      </p>
    </div>
  );
}

export default Components;
