import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './QueryExample.module.css';

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
        <div className={styles.queryExample}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2>TanStack Query</h2>
                    <p>
                        Gerenciamento de estado assíncrono, cache e mutações.
                    </p>
                </div>
                <Link to="/modern">
                    <Button variant="secondary" size="sm">
                        ← Voltar
                    </Button>
                </Link>
            </div>

            <div className={styles.grid}>
                {/* Form Section */}
                <div>
                    <div className={styles.formCard}>
                        <h3>Novo Post</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Título</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={styles.input}
                                    placeholder="Digite o título..."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Conteúdo</label>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className={styles.textarea}
                                    placeholder="Digite o conteúdo..."
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                loading={mutation.isPending}
                                className="w-full"
                            >
                                Criar Post
                            </Button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div>
                    <h3 className={styles.sectionTitle}>
                        Posts Recentes
                        {isLoading && <span className={styles.loadingText}>(Carregando...)</span>}
                    </h3>

                    {isError && (
                        <div className={styles.error}>
                            Erro ao carregar posts: {error.message}
                        </div>
                    )}

                    {isLoading && !posts ? (
                        // Skeleton Loading
                        [...Array(3)].map((_, i) => (
                            <div key={i} className={styles.skeleton}>
                                <div className={styles.skeletonTitle}></div>
                                <div className={styles.skeletonBody}></div>
                                <div className={styles.skeletonBodyShort}></div>
                            </div>
                        ))
                    ) : (
                        posts?.map((post) => (
                            <div key={post.id} className={styles.postCard}>
                                <div className={styles.postHeader}>
                                    <h4 className={styles.postTitle}>{post.title}</h4>
                                    <span className={styles.postId}>ID: {post.id}</span>
                                </div>
                                <p className={styles.postBody}>{post.body}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
