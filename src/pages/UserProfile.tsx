import { useParams, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import styles from './UserProfile.module.css';

/**
 * UserProfile page - Exemplo de rota com parâmetro dinâmico :id
 */
function UserProfile() {
  const { id } = useParams<{ id: string }>();

  // Mock user data - em uma aplicação real, isso viria de uma API
  interface MockUser {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
    joinDate: string;
    stats: {
      posts: number;
      followers: number;
      following: number;
    };
    skills: string[];
    recentPosts: Array<{
      id: number;
      title: string;
      date: string;
    }>;
  }

  const mockUsers: Record<string, MockUser> = {
    '123': {
      id: '123',
      name: 'João Silva',
      username: 'joaosilva',
      email: 'joao@example.com',
      avatar: '👨‍💻',
      bio: 'Desenvolvedor Full Stack apaixonado por React e TypeScript. Sempre aprendendo algo novo!',
      location: 'São Paulo, Brasil',
      website: 'https://joaosilva.dev',
      joinDate: '2023-01-15',
      stats: {
        posts: 42,
        followers: 1234,
        following: 567,
      },
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker'],
      recentPosts: [
        { id: 1, title: 'Como usar Custom Hooks no React', date: '2024-03-15' },
        { id: 2, title: 'TypeScript: Dicas e Truques', date: '2024-03-10' },
        { id: 3, title: 'Gerenciamento de Estado com Context API', date: '2024-03-05' },
      ],
    },
    '456': {
      id: '456',
      name: 'Maria Santos',
      username: 'mariasantos',
      email: 'maria@example.com',
      avatar: '👩‍💼',
      bio: 'UX/UI Designer e Frontend Developer. Criando experiências incríveis para a web.',
      location: 'Rio de Janeiro, Brasil',
      website: 'https://mariasantos.design',
      joinDate: '2023-06-20',
      stats: {
        posts: 28,
        followers: 892,
        following: 345,
      },
      skills: ['Figma', 'React', 'CSS', 'JavaScript', 'Design Systems'],
      recentPosts: [
        { id: 1, title: 'Princípios de Design para Desenvolvedores', date: '2024-03-12' },
        { id: 2, title: 'CSS Grid vs Flexbox: Quando usar cada um', date: '2024-03-08' },
      ],
    },
  };

  const user = mockUsers[id || ''] || null;

  if (!user) {
    return (
      <div className={styles.userProfile}>
        <div className={styles.notFound}>
          <Card>
            <div className={styles.notFoundContent}>
              <span className={styles.notFoundIcon}>👤❌</span>
              <h2>Usuário não encontrado</h2>
              <p>O usuário com ID "{id}" não existe ou foi removido.</p>
              <div className={styles.notFoundActions}>
                <Link to="/">
                  <Button variant="primary">Voltar para Home</Button>
                </Link>
                <Link to="/user/123">
                  <Button variant="secondary">Ver Perfil de Exemplo</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userProfile}>
      <header className={styles.header}>
        <Link to="/">
          <Button variant="secondary" size="sm">
            ← Voltar
          </Button>
        </Link>
      </header>

      <div className={styles.profileHeader}>
        <Card>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>{user.avatar}</div>
            <div className={styles.userDetails}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.username}>@{user.username}</p>
              <p className={styles.bio}>{user.bio}</p>
              <div className={styles.metadata}>
                <span className={styles.metaItem}>
                  📍 {user.location}
                </span>
                <span className={styles.metaItem}>
                  🌐 <a href={user.website} target="_blank" rel="noopener noreferrer">
                    {user.website.replace('https://', '')}
                  </a>
                </span>
                <span className={styles.metaItem}>
                  📅 Membro desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className={styles.actions}>
                <Button variant="primary">Seguir</Button>
                <Button variant="secondary">Mensagem</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.statValue}>{user.stats.posts}</div>
            <div className={styles.statLabel}>Posts</div>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statValue}>{user.stats.followers.toLocaleString()}</div>
            <div className={styles.statLabel}>Seguidores</div>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statValue}>{user.stats.following.toLocaleString()}</div>
            <div className={styles.statLabel}>Seguindo</div>
          </Card>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <Card title="📝 Posts Recentes">
            <div className={styles.postsList}>
              {user.recentPosts.map((post) => (
                <div key={post.id} className={styles.postItem}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <span className={styles.postDate}>
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className={styles.sidebar}>
          <Card title="💼 Habilidades">
            <div className={styles.skillsList}>
              {user.skills.map((skill: string) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          <Card title="📧 Contato">
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <a href={`mailto:${user.email}`} className={styles.contactValue}>
                  {user.email}
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.demoInfo}>
        <Card title="💡 Sobre esta página">
          <p>
            Esta é uma página de exemplo que demonstra o uso de <strong>parâmetros dinâmicos</strong> em
            rotas do React Router. O ID do usuário ({id}) é extraído da URL usando o hook{' '}
            <code>useParams</code>.
          </p>
          <p className={styles.tryOther}>
            Experimente acessar outros perfis:
          </p>
          <div className={styles.profileLinks}>
            <Link to="/user/123" className={styles.profileLink}>
              Perfil #123
            </Link>
            <Link to="/user/456" className={styles.profileLink}>
              Perfil #456
            </Link>
            <Link to="/user/999" className={styles.profileLink}>
              Perfil #999 (não existe)
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserProfile;
