import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './ModernTech.module.css';

const examples = [
    {
        title: 'TanStack Query',
        description: 'Gerenciamento de estado assíncrono e cache de dados.',
        path: '/modern/query',
        colorClass: styles.red,
        icon: '📡',
    },
    {
        title: 'React Hook Form',
        description: 'Formulários performáticos com validação Zod.',
        path: '/modern/form',
        colorClass: styles.pink,
        icon: '📝',
    },
    {
        title: 'Zustand',
        description: 'Gerenciamento de estado global simplificado.',
        path: '/modern/zustand',
        colorClass: styles.yellow,
        icon: '🐻',
    },
    {
        title: 'Tailwind CSS',
        description: 'Estilização utility-first rápida e responsiva.',
        path: '/modern/tailwind',
        colorClass: styles.blue,
        icon: '🎨',
    },
];

export default function ModernTech() {
    return (
        <div className={styles.modernTech}>
            <header className={styles.header}>
                <Link to="/" className={styles.backLink}>
                    <Button variant="secondary" size="sm">
                        ← Voltar
                    </Button>
                </Link>
                <h1>Tecnologias Modernas</h1>
                <p>
                    Exemplos práticos das ferramentas mais utilizadas no ecossistema React atual.
                </p>
            </header>

            <div className={styles.grid}>
                {examples.map((ex) => (
                    <Link
                        key={ex.path}
                        to={ex.path}
                        className={styles.card}
                    >
                        <div className={`${styles.colorBar} ${ex.colorClass}`} />
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.icon}>
                                    {ex.icon}
                                </span>
                                <span className={styles.arrow}>
                                    ➜
                                </span>
                            </div>
                            <h3 className={styles.cardTitle}>{ex.title}</h3>
                            <p className={styles.cardDescription}>{ex.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
