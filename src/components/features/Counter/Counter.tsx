import { useState, useCallback } from 'react';
import styles from './Counter.module.css';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

/**
 * Componente Counter que demonstra useState e event handlers
 * Permite incrementar e decrementar um valor com step configurável
 */
function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount((prev) => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return (
    <div className={styles.counter}>
      <div className={styles.display}>
        <span className={styles.value}>{count}</span>
      </div>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.decrement}`}
          onClick={decrement}
          aria-label="Decrementar"
        >
          -
        </button>
        <button
          className={`${styles.button} ${styles.reset}`}
          onClick={reset}
          aria-label="Resetar"
        >
          Reset
        </button>
        <button
          className={`${styles.button} ${styles.increment}`}
          onClick={increment}
          aria-label="Incrementar"
        >
          +
        </button>
      </div>
      {step !== 1 && (
        <div className={styles.info}>
          <small>Step: {step}</small>
        </div>
      )}
    </div>
  );
}

export default Counter;
