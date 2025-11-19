import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

// API Functions
const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    return data;
};

const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return data;
};

export default function QueryExample() {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // Query
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    // Mutation
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            // In a real app, we would invalidate the query to refetch
            // queryClient.invalidateQueries({ queryKey: ['posts'] });

            // For this demo with JSONPlaceholder (which doesn't actually save), 
            // we'll manually update the cache to show the result
            queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
                return [newPost, ...(old || [])];
            });

            setTitle('');
            setBody('');
            alert('Post criado com sucesso! (Simulado)');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        mutation.mutate({
            title,
            body,
            userId: 1,
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">TanStack Query</h2>
                    <p className="text-gray-600 mt-2">
                        Gerenciamento de estado assíncrono, cache e mutações.
                    </p>
                </div>
                <Link to="/modern" className="text-blue-600 hover:underline">← Voltar</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Novo Post</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Digite o título..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none"
                                    placeholder="Digite o conteúdo..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {mutation.isPending ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Enviando...
                                    </>
                                ) : (
                                    'Criar Post'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Posts Recentes
                        {isLoading && <span className="text-sm font-normal text-gray-500 ml-2">(Carregando...)</span>}
                    </h3>

                    {isError && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
                            Erro ao carregar posts: {error.message}
                        </div>
                    )}

                    {isLoading && !posts ? (
                        // Skeleton Loading
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))
                    ) : (
                        posts?.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                            >
                                <div className="flex items-start justify-between">
                                    <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h4>
                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
                                        ID: {post.id}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{post.body}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
