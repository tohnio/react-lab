import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Zustand</h2>
                    <p className="text-gray-600 mt-2">
                        Gerenciamento de estado global simples, escalável e persistente.
                    </p>
                </div>
                <Link to="/modern" className="text-blue-600 hover:underline">← Voltar</Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="O que precisa ser feito?"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        Adicionar
                    </button>
                </form>

                <div className="space-y-3">
                    {todos.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <span className="text-4xl block mb-2">📝</span>
                            Nenhuma tarefa por enquanto.
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${todo.completed
                                        ? 'bg-gray-50 border-gray-200'
                                        : 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'border-gray-300 hover:border-yellow-500'
                                            }`}
                                    >
                                        {todo.completed && '✓'}
                                    </button>
                                    <span
                                        className={`text-lg transition-all ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                                            }`}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                                    title="Remover"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {todos.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                        <span>{pendingCount} tarefas pendentes</span>
                        {completedCount > 0 && (
                            <button
                                onClick={clearCompleted}
                                className="text-red-500 hover:underline hover:text-red-600"
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
