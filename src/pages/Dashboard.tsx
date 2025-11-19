import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Counter from '../components/features/Counter/Counter';
import styles from './Dashboard.module.css';

/**
 * Dashboard page - Exemplo de rota protegida
 * Esta página só deve ser acessível para usuários autenticados
 */
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Fallback se o usuário não estiver carregado (embora ProtectedRoute deva prevenir isso)
  if (!user) return null;

  const stats = [
    { label: 'Projetos', value: '12', icon: '📁' },
    { label: 'Tarefas Completas', value: '48', icon: '✅' },
    { label: 'Em Progresso', value: '7', icon: '⏳' },
    { label: 'Dias Ativos', value: '305', icon: '📅' },
  ];

  const recentActivities = [
    { id: 1, action: 'Completou tarefa "Implementar autenticação"', time: '2 horas atrás' },
    { id: 2, action: 'Criou novo projeto "React Learning"', time: '5 horas atrás' },
    { id: 3, action: 'Atualizou perfil', time: '1 dia atrás' },
    { id: 4, action: 'Comentou em "Bug fix #123"', time: '2 dias atrás' },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Bem-vindo de volta, {user.name}! 👋</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
          <Link to="/">
            <Button variant="primary">Voltar para Home</Button>
          </Link>
        </div>
      </header>

      <div className={styles.alert}>
        <span className={styles.alertIcon}>🔒</span>
        <div className={styles.alertContent}>
          <strong>Rota Protegida</strong>
          <p>
            Esta é uma página de exemplo que representa uma rota protegida. Em uma aplicação real,
            você precisaria estar autenticado para acessá-la.
          </p>
        </div>
      </div>

      <section className={styles.userInfo}>
        <Card title="👤 Informações do Usuário">
          <div className={styles.userDetails}>
            <div className={styles.userField}>
              <span className={styles.label}>Nome:</span>
              <span className={styles.value}>{user.name}</span>
            </div>
            <div className={styles.userField}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            <div className={styles.userField}>
              <span className={styles.label}>Função:</span>
              <span className={styles.value}>{'Developer (Mock)'}</span>
            </div>
            <div className={styles.userField}>
              <span className={styles.label}>Membro desde:</span>
              <span className={styles.value}>
                {new Date().toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </Card>
      </section>

      <section className={styles.stats}>
        <h2 className={styles.sectionTitle}>Estatísticas</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <Card key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      <div className={styles.twoColumns}>
        <section className={styles.activities}>
          <Card title="📋 Atividades Recentes">
            <div className={styles.activityList}>
              {recentActivities.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityDot}></div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityAction}>{activity.action}</p>
                    <span className={styles.activityTime}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className={styles.widget}>
          <Card title="🎯 Widget Interativo">
            <p className={styles.widgetDescription}>
              Exemplo de componente interativo no dashboard:
            </p>
            <div className={styles.counterWidget}>
              <Counter initialValue={0} step={1} />
            </div>
            <div className={styles.widgetActions}>
              <Link to="/components">
                <Button size="sm" variant="secondary">
                  Ver mais componentes
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>

      <section className={styles.quickLinks}>
        <Card title="🔗 Links Rápidos">
          <div className={styles.linksGrid}>
            <Link to="/components" className={styles.quickLink}>
              <span className={styles.linkIcon}>🧩</span>
              <span>Componentes</span>
            </Link>
            <Link to="/hooks" className={styles.quickLink}>
              <span className={styles.linkIcon}>🪝</span>
              <span>Custom Hooks</span>
            </Link>
            <Link to="/forms" className={styles.quickLink}>
              <span className={styles.linkIcon}>📝</span>
              <span>Formulários</span>
            </Link>
            <Link to="/api-demo" className={styles.quickLink}>
              <span className={styles.linkIcon}>🌐</span>
              <span>API Demo</span>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
