import { useState, useCallback, useMemo } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import styles from './TodoList.module.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

/**
 * Componente TodoList que demonstra CRUD operations e state management
 * Persiste dados no localStorage usando custom hook
 */
function TodoList({ initialTodos = [] }: TodoListProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos);
  const [inputValue, setInputValue] = useState('');

  const addTodo = useCallback(() => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
    setInputValue('');
  }, [inputValue, setTodos]);

  const removeTodo = useCallback((id: string) => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos]);

  const toggleComplete = useCallback((id: string) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter((todo) => !todo.completed));
  }, [setTodos]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }, [addTodo]);

  // Usa useMemo para otimizar cálculos de contadores
  const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);
  const activeCount = useMemo(() => todos.length - completedCount, [todos.length, completedCount]);

  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Tarefas</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Adicionar nova tarefa..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Nova tarefa"
          />
          <button
            className={styles.addButton}
            onClick={addTodo}
            disabled={inputValue.trim() === ''}
            aria-label="Adicionar tarefa"
          >
            Adicionar
          </button>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className={styles.empty}>
          Nenhuma tarefa adicionada. Comece criando uma!
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`${styles.todoItem} ${
                  todo.completed ? styles.completed : ''
                }`}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  aria-label={`Marcar "${todo.text}" como ${
                    todo.completed ? 'incompleta' : 'completa'
                  }`}
                />
                <span className={styles.todoText}>{todo.text}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => removeTodo(todo.id)}
                  aria-label={`Remover "${todo.text}"`}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.stats}>
            <span>
              {activeCount} {activeCount === 1 ? 'tarefa ativa' : 'tarefas ativas'}
            </span>
            <button
              className={styles.clearButton}
              onClick={clearCompleted}
              disabled={completedCount === 0}
              aria-label="Limpar tarefas completas"
            >
              Limpar completas ({completedCount})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoList;
