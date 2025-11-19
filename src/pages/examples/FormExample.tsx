import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';

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
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">React Hook Form + Zod</h2>
                    <p className="text-gray-600 mt-2">
                        Validação complexa, performance e experiência do usuário.
                    </p>
                </div>
                <Link to="/modern" className="text-blue-600 hover:underline">← Voltar</Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
                            <input
                                {...register('username')}
                                className={`w-full p-2.5 border rounded-lg outline-none transition-all ${errors.username ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    }`}
                                placeholder="johndoe"
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                {...register('email')}
                                className={`w-full p-2.5 border rounded-lg outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    }`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                            <input
                                type="number"
                                {...register('age', { valueAsNumber: true })}
                                className={`w-full p-2.5 border rounded-lg outline-none transition-all ${errors.age ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    }`}
                                placeholder="25"
                            />
                            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                            <select
                                {...register('role')}
                                className={`w-full p-2.5 border rounded-lg outline-none transition-all bg-white ${errors.role ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    }`}
                            >
                                <option value="user">Usuário</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Administrador</option>
                            </select>
                            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <input
                                type="password"
                                {...register('password')}
                                className={`w-full p-2.5 border rounded-lg outline-none transition-all ${errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    }`}
                                placeholder="••••••"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                            <input
                                type="password"
                                {...register('confirmPassword')}
                                className={`w-full p-2.5 border rounded-lg outline-none transition-all ${errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    }`}
                                placeholder="••••••"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                {...register('terms')}
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
                            Eu concordo com os <a href="#" className="text-blue-600 hover:underline">termos e condições</a>
                        </label>
                    </div>
                    {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processando...
                            </>
                        ) : (
                            'Criar Conta'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
