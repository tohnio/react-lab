import { Link } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  showThemeToggle?: boolean;
}

export default function Header({ title, showThemeToggle = true }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            {title}
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/components" className={styles.navLink}>
            Components
          </Link>
          <Link to="/hooks" className={styles.navLink}>
            Hooks
          </Link>
          <Link to="/forms" className={styles.navLink}>
            Forms
          </Link>
          <Link to="/api-demo" className={styles.navLink}>
            API Demo
          </Link>
          <Link to="/modern" className={styles.navLink}>
            Modern Tech
          </Link>
        </nav>

        {showThemeToggle && (
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        )}
      </div>
    </header>
  );
}
