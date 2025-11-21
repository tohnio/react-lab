import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/common/Button';
import styles from './ZustandExample.module.css';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    clearCompleted: () => void;
}

const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [],
            addTodo: (text) =>
                set((state) => ({
                    todos: [
                        ...state.todos,
                        { id: crypto.randomUUID(), text, completed: false },
                    ],
                })),
            toggleTodo: (id) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    ),
                })),
            removeTodo: (id) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                })),
            clearCompleted: () =>
                set((state) => ({
                    todos: state.todos.filter((todo) => !todo.completed),
                })),
        }),
        {
            name: 'todo-storage', // unique name for localStorage
        }
    )
);

export default function ZustandExample() {
    const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodoStore();
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        addTodo(inputValue);
        setInputValue('');
    };

    const completedCount = todos.filter(t => t.completed).length;
    const pendingCount = todos.length - completedCount;

    return (
        <div className={styles.zustandExample}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2>Zustand</h2>
                    <p>
                        Gerenciamento de estado global simples, escalável e persistente.
                    </p>
                </div>
                <Link to="/modern">
                    <Button variant="secondary" size="sm">
                        ← Voltar
                    </Button>
                </Link>
            </div>

            <div className={styles.todoContainer}>
                <form onSubmit={handleAdd} className={styles.form}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="O que precisa ser feito?"
                        className={styles.input}
                    />
                    <Button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white" // Custom override for yellow theme
                    >
                        Adicionar
                    </Button>
                </form>

                <div className={styles.todoList}>
                    {todos.length === 0 ? (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>📝</span>
                            Nenhuma tarefa por enquanto.
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
                            >
                                <div className={styles.todoContent}>
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`${styles.checkButton} ${todo.completed ? styles.checked : ''}`}
                                    >
                                        {todo.completed && '✓'}
                                    </button>
                                    <span
                                        className={`${styles.todoText} ${todo.completed ? styles.completedText : ''}`}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className={styles.deleteButton}
                                    title="Remover"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {todos.length > 0 && (
                    <div className={styles.footer}>
                        <span>{pendingCount} tarefas pendentes</span>
                        {completedCount > 0 && (
                            <button
                                onClick={clearCompleted}
                                className={styles.clearButton}
                            >
                                Limpar concluídas
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
