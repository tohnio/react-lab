import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import styles from './NotFound.module.css';

/**
 * NotFound page - Página 404 para rotas inexistentes
 */
function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Página Não Encontrada</h1>
        <p className={styles.message}>
          Oops! A página que você está procurando não existe ou foi movida.
        </p>

        <Card className={styles.card}>
          <div className={styles.suggestions}>
            <h3>O que você pode fazer:</h3>
            <ul>
              <li>Verificar se o endereço está correto</li>
              <li>Voltar para a página inicial</li>
              <li>Explorar outras funcionalidades do projeto</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <Link to="/">
              <Button variant="primary" size="lg">
                🏠 Ir para Home
              </Button>
            </Link>
            <Link to="/components">
              <Button variant="secondary" size="lg">
                🧩 Ver Componentes
              </Button>
            </Link>
          </div>
        </Card>

        <div className={styles.links}>
          <h3>Links Úteis:</h3>
          <div className={styles.linkGrid}>
            <Link to="/hooks" className={styles.link}>
              Custom Hooks
            </Link>
            <Link to="/forms" className={styles.link}>
              Formulários
            </Link>
            <Link to="/api-demo" className={styles.link}>
              API Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
