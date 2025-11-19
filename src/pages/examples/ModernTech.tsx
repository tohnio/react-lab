import { Link } from 'react-router-dom';

const examples = [
    {
        title: 'TanStack Query',
        description: 'Gerenciamento de estado assíncrono e cache de dados.',
        path: '/modern/query',
        color: 'bg-red-500',
        icon: '📡',
    },
    {
        title: 'React Hook Form',
        description: 'Formulários performáticos com validação Zod.',
        path: '/modern/form',
        color: 'bg-pink-500',
        icon: '📝',
    },
    {
        title: 'Zustand',
        description: 'Gerenciamento de estado global simplificado.',
        path: '/modern/zustand',
        color: 'bg-yellow-500',
        icon: '🐻',
    },
    {
        title: 'Tailwind CSS',
        description: 'Estilização utility-first rápida e responsiva.',
        path: '/modern/tailwind',
        color: 'bg-blue-500',
        icon: '🎨',
    },
];

export default function ModernTech() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Tecnologias Modernas</h1>
            <p className="text-gray-600 mb-8">
                Exemplos práticos das ferramentas mais utilizadas no ecossistema React atual.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {examples.map((ex) => (
                    <Link
                        key={ex.path}
                        to={ex.path}
                        className="block group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className={`absolute top-0 left-0 w-2 h-full ${ex.color}`} />
                        <div className="p-6 pl-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                    {ex.icon}
                                </span>
                                <span className="text-gray-300 group-hover:text-gray-400 transition-colors">
                                    ➜
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{ex.title}</h3>
                            <p className="text-gray-600 text-sm">{ex.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
