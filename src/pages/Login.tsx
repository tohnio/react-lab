import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Obtém a página de origem para redirecionar de volta após o login
    // Se não houver origem, redireciona para o dashboard (/protected)
    const from = location.state?.from?.pathname || '/protected';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!email || !password) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            await login(email, password);
            // Redireciona para a página original ou dashboard
            navigate(from, { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Falha ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.title}>Bem-vindo</h1>
                <p className={styles.subtitle}>Faça login para acessar sua conta</p>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="seu@email.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>

                    <Button
                        type="submit"
                        loading={isLoading}
                        className={styles.fullWidth}
                    >
                        Entrar
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>Dica: Use qualquer email e senha para testar.</p>
                </div>
            </div>
        </div>
    );
}
