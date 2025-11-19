import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import Loading from '../components/common/Loading';
import styles from './Hooks.module.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

/**
 * Hooks page - Demonstra exemplos de uso de cada custom hook
 */
function Hooks() {
  // useLocalStorage demo
  const [name, setName] = useLocalStorage<string>('demo-name', '');
  const [count, setCount] = useLocalStorage<number>('demo-count', 0);

  // useDebounce demo
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  // useFetch demo
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit='+count
  );

  // useForm demo
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useForm({
    initialValues: {
      email: '',
      message: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.email) {
        errors.email = 'Email é obrigatório';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email inválido';
      }
      if (!values.message) {
        errors.message = 'Mensagem é obrigatória';
      } else if (values.message.length < 10) {
        errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
      }
      return errors;
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Formulário enviado!\nEmail: ${values.email}\nMensagem: ${values.message}`);
    },
  });

  return (
    <div className={styles.hooks}>
      <header className={styles.header}>
        <Link to="/">
          <Button variant="secondary" size="sm">
            ← Voltar
          </Button>
        </Link>
        <h1>Custom Hooks</h1>
        <p>Explore hooks personalizados para reutilização de lógica</p>
      </header>

      <section className={styles.section}>
        <Card title="useLocalStorage Hook" className={styles.demoCard}>
          <p className={styles.description}>
            Hook para sincronizar estado com localStorage. Os dados persistem mesmo após recarregar
            a página.
          </p>
          <div className={styles.demo}>
            <div className={styles.formGroup}>
              <label htmlFor="name-input">Nome:</label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className={styles.input}
              />
              <p className={styles.hint}>
                Valor armazenado: <strong>{name || '(vazio)'}</strong>
              </p>
            </div>

            <div className={styles.formGroup}>
              <label>Contador:</label>
              <div className={styles.counterControls}>
                <Button onClick={() => setCount(count - 1)}>-</Button>
                <span className={styles.counterValue}>{count}</span>
                <Button onClick={() => setCount(count + 1)}>+</Button>
                <Button variant="secondary" onClick={() => setCount(0)}>
                  Reset
                </Button>
              </div>
              <p className={styles.hint}>
                💡 Recarregue a página e os valores permanecerão salvos!
              </p>
            </div>
          </div>
        </Card>

        <Card title="useDebounce Hook" className={styles.demoCard}>
          <p className={styles.description}>
            Hook para fazer debounce de valores. Útil para otimizar buscas e evitar requisições
            excessivas.
          </p>
          <div className={styles.demo}>
            <div className={styles.formGroup}>
              <label htmlFor="search-input">Digite algo:</label>
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite para ver o debounce em ação..."
                className={styles.input}
              />
            </div>

            <div className={styles.debounceResults}>
              <div className={styles.resultRow}>
                <span className={styles.label}>Valor imediato:</span>
                <span className={styles.value}>{searchTerm || '(vazio)'}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.label}>Valor com debounce (800ms):</span>
                <span className={styles.value}>
                  {debouncedSearchTerm || '(vazio)'}
                  {searchTerm !== debouncedSearchTerm && (
                    <span className={styles.waiting}> ⏳ aguardando...</span>
                  )}
                </span>
              </div>
            </div>

            <p className={styles.hint}>
              💡 O valor com debounce só atualiza 800ms após você parar de digitar!
            </p>
          </div>
        </Card>

        <Card title="useFetch Hook" className={styles.demoCard}>
          <p className={styles.description}>
            Hook para fazer requisições HTTP com gerenciamento automático de loading, error e cache.
          </p>
          <div className={styles.demo}>
            {loading && <Loading text="Carregando posts..." />}

            {error && (
              <div className={styles.error}>
                <p>❌ Erro ao carregar dados: {error.message}</p>
                <Button onClick={refetch}>Tentar novamente</Button>
              </div>
            )}

            {posts && (
              <>
                <div className={styles.postsList}>
                  {posts.map((post) => (
                    <div key={post.id} className={styles.postItem}>
                      <h4>{post.title}</h4>
                      <p>{post.body.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
                <div className={styles.actions}>
                  <Button onClick={refetch} variant="secondary">
                    🔄 Recarregar dados
                  </Button>
                </div>
                <p className={styles.hint}>
                  💡 Os dados são cacheados. Clique em recarregar para buscar novamente!
                </p>
              </>
            )}
          </div>
        </Card>

        <Card title="useForm Hook" className={styles.demoCard}>
          <p className={styles.description}>
            Hook para gerenciar formulários com validação em tempo real, campos tocados e submissão.
          </p>
          <div className={styles.demo}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email-input">Email:</label>
                <input
                  id="email-input"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  className={`${styles.input} ${
                    touched.email && errors.email ? styles.inputError : ''
                  }`}
                  placeholder="seu@email.com"
                />
                {touched.email && errors.email && (
                  <span className={styles.errorMessage}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message-input">Mensagem:</label>
                <textarea
                  id="message-input"
                  value={values.message}
                  onChange={handleChange('message')}
                  onBlur={handleBlur('message')}
                  className={`${styles.textarea} ${
                    touched.message && errors.message ? styles.inputError : ''
                  }`}
                  placeholder="Digite sua mensagem (mínimo 10 caracteres)"
                  rows={4}
                />
                {touched.message && errors.message && (
                  <span className={styles.errorMessage}>{errors.message}</span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button type="submit" disabled={!isValid || isSubmitting} loading={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </div>

              <p className={styles.hint}>
                💡 O botão só fica habilitado quando o formulário é válido!
              </p>
            </form>
          </div>
        </Card>
      </section>

      <section className={styles.codeSection}>
        <Card title="💡 Sobre Custom Hooks">
          <p>
            Custom hooks são uma forma poderosa de reutilizar lógica entre componentes. Eles
            permitem:
          </p>
          <ul>
            <li>✅ Extrair lógica complexa de componentes</li>
            <li>✅ Compartilhar comportamento entre componentes</li>
            <li>✅ Manter componentes mais limpos e focados</li>
            <li>✅ Testar lógica de forma isolada</li>
            <li>✅ Seguir o princípio DRY (Don't Repeat Yourself)</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default Hooks;
