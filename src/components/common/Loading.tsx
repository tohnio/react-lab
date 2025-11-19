import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text, fullScreen = false }) => {
  const spinnerClasses = [styles.spinner, styles[size]].filter(Boolean).join(' ');

  const content = (
    <div className={styles.loadingContent}>
      <div className={spinnerClasses} role="status" aria-label="Loading">
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
      </div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullScreen}>{content}</div>;
  }

  return content;
};

export default Loading;
