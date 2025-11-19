import styles from './Example.module.css';

/**
 * Example component to verify CSS Modules configuration
 */
const Example = () => {
  return (
    <div className={styles.example}>
      <h2 className={styles.title}>CSS Modules Working!</h2>
      <p>This component uses CSS Modules with scoped styles.</p>
    </div>
  );
};

export default Example;
