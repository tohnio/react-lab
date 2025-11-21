import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './FormExample.module.css';

const schema = z.object({
    username: z.string().min(3, 'O usuário deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    age: z.number({ invalid_type_error: 'Idade deve ser um número' }).min(18, 'Você deve ser maior de 18 anos'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    role: z.enum(['user', 'admin', 'editor'], { errorMap: () => ({ message: 'Selecione uma função' }) }),
    terms: z.literal(true, { errorMap: () => ({ message: 'Você deve aceitar os termos' }) }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function FormExample() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: 'user',
        }
    });

    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula API
        console.log(data);
        alert('Formulário enviado com sucesso! Veja o console.');
        reset();
    };

    return (
        <div className={styles.formExample}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2>React Hook Form + Zod</h2>
                    <p>
                        Validação complexa, performance e experiência do usuário.
                    </p>
                </div>
                <Link to="/modern">
                    <Button variant="secondary" size="sm">
                        ← Voltar
                    </Button>
                </Link>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.grid}>
                        {/* Username */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Usuário</label>
                            <input
                                {...register('username')}
                                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                                placeholder="johndoe"
                            />
                            {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
                        </div>

                        {/* Email */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                {...register('email')}
                                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                        </div>

                        {/* Age */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Idade</label>
                            <input
                                type="number"
                                {...register('age', { valueAsNumber: true })}
                                className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
                                placeholder="25"
                            />
                            {errors.age && <p className={styles.errorMessage}>{errors.age.message}</p>}
                        </div>

                        {/* Role */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Função</label>
                            <select
                                {...register('role')}
                                className={`${styles.select} ${errors.role ? styles.inputError : ''}`}
                            >
                                <option value="user">Usuário</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Administrador</option>
                            </select>
                            {errors.role && <p className={styles.errorMessage}>{errors.role.message}</p>}
                        </div>

                        {/* Password */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Senha</label>
                            <input
                                type="password"
                                {...register('password')}
                                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                                placeholder="••••••"
                            />
                            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Confirmar Senha</label>
                            <input
                                type="password"
                                {...register('confirmPassword')}
                                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                                placeholder="••••••"
                            />
                            {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {/* Terms */}
                    <div className={styles.checkboxGroup}>
                        <input
                            id="terms"
                            type="checkbox"
                            {...register('terms')}
                            className={styles.checkbox}
                        />
                        <div className={styles.inputGroup}>
                            <label htmlFor="terms" className={styles.checkboxLabel}>
                                Eu concordo com os <a href="#" className={styles.link}>termos e condições</a>
                            </label>
                            {errors.terms && <p className={styles.errorMessage}>{errors.terms.message}</p>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        className={styles.submitButton}
                    >
                        Criar Conta
                    </Button>
                </form>
            </div>
        </div>
    );
}
