import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import styles from './Home.module.css';

/**
 * Home page - Overview do projeto com links para outras páginas
 */
function Home() {
  const features = [
    {
      title: '🧩 Componentes',
      description: 'Explore componentes reutilizáveis como Button, Card, Modal e Loading',
      link: '/components',
      color: '#007bff',
    },
    {
      title: '🪝 Custom Hooks',
      description: 'Aprenda sobre hooks personalizados: useForm, useFetch, useLocalStorage e useDebounce',
      link: '/hooks',
      color: '#28a745',
    },
    {
      title: '📝 Formulários',
      description: 'Veja exemplos de formulários com validação em tempo real',
      link: '/forms',
      color: '#ffc107',
    },
    {
      title: '🌐 API Demo',
      description: 'Integração com APIs públicas (JSONPlaceholder e OpenWeather)',
      link: '/api-demo',
      color: '#17a2b8',
    },
    {
      title: '🔒 Rota Protegida',
      description: 'Exemplo de rota que requer autenticação',
      link: '/protected',
      color: '#dc3545',
    },
    {
      title: '👤 Perfil de Usuário',
      description: 'Exemplo de rota com parâmetro dinâmico',
      link: '/user/123',
      color: '#6f42c1',
    },
    {
      title: '🚀 Modern Tech',
      description: 'TanStack Query, React Hook Form, Zustand, Tailwind CSS e Vitest',
      link: '/modern',
      color: '#ec4899',
    },
  ];

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>React Learning Project</h1>
        <p className={styles.subtitle}>
          Uma aplicação interativa para aprender conceitos fundamentais e avançados do ReactJS
        </p>
      </header>

      <section className={styles.about}>
        <Card title="📚 Sobre o Projeto">
          <p>
            Este projeto foi desenvolvido para demonstrar conceitos essenciais do React através de
            exemplos práticos e interativos. Aqui você encontrará:
          </p>
          <ul className={styles.list}>
            <li>✅ Componentes funcionais com TypeScript</li>
            <li>✅ Gerenciamento de estado com Context API</li>
            <li>✅ Custom hooks reutilizáveis</li>
            <li>✅ Roteamento com React Router v6</li>
            <li>✅ Integração com APIs externas</li>
            <li>✅ Formulários com validação</li>
            <li>✅ Estilização com CSS Modules</li>
            <li>✅ Boas práticas e padrões modernos</li>
            <li>✅ <strong>NOVO:</strong> Stack moderna (Query, Zustand, Tailwind)</li>
          </ul>
        </Card>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Explore as Funcionalidades</h2>
        <div className={styles.grid}>
          {features.map((feature) => (
            <Link
              key={feature.link}
              to={feature.link}
              className={styles.featureCard}
              style={{ borderColor: feature.color }}
            >
              <div className={styles.featureIcon} style={{ color: feature.color }}>
                {feature.title.split(' ')[0]}
              </div>
              <h3 className={styles.featureTitle}>{feature.title.split(' ').slice(1).join(' ')}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <span className={styles.featureLink} style={{ color: feature.color }}>
                Ver mais →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.techStack}>
        <Card title="🛠️ Tecnologias Utilizadas">
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <strong>React 18+</strong>
              <span>Framework principal</span>
            </div>
            <div className={styles.techItem}>
              <strong>TypeScript</strong>
              <span>Type safety</span>
            </div>
            <div className={styles.techItem}>
              <strong>Vite</strong>
              <span>Build tool</span>
            </div>
            <div className={styles.techItem}>
              <strong>React Router v6</strong>
              <span>Roteamento</span>
            </div>
            <div className={styles.techItem}>
              <strong>Axios</strong>
              <span>HTTP client</span>
            </div>
            <div className={styles.techItem}>
              <strong>CSS Modules</strong>
              <span>Estilização</span>
            </div>
          </div>
        </Card>
      </section>

      <section className={styles.cta}>
        <Card>
          <div className={styles.ctaContent}>
            <h2>Pronto para começar?</h2>
            <p>Escolha uma das funcionalidades acima e comece a explorar!</p>
            <div className={styles.ctaButtons}>
              <Link to="/components" className={styles.primaryButton}>
                Ver Componentes
              </Link>
              <Link to="/hooks" className={styles.secondaryButton}>
                Ver Hooks
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Home;
