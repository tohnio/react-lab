import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink} onClick={onClose}>
            <span className={styles.icon}>🏠</span>
            Home
          </Link>
          <Link to="/components" className={styles.navLink} onClick={onClose}>
            <span className={styles.icon}>🧩</span>
            Components
          </Link>
          <Link to="/hooks" className={styles.navLink} onClick={onClose}>
            <span className={styles.icon}>🪝</span>
            Hooks
          </Link>
          <Link to="/forms" className={styles.navLink} onClick={onClose}>
            <span className={styles.icon}>📝</span>
            Forms
          </Link>
          <Link to="/api-demo" className={styles.navLink} onClick={onClose}>
            <span className={styles.icon}>🌐</span>
            API Demo
          </Link>
          <Link to="/protected" className={styles.navLink} onClick={onClose}>
            <span className={styles.icon}>🔒</span>
            Protected
          </Link>
        </nav>

        <div className={styles.footer}>
          <p className={styles.footerText}>React Learning Project</p>
          <p className={styles.footerSubtext}>Built with React + TypeScript</p>
        </div>
      </aside>
    </>
  );
}
