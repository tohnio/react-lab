import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './E2EExample.module.css';

export default function E2EExample() {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [items, setItems] = useState<string[]>(['Item 1', 'Item 2']);

    const handleUpdateText = () => {
        setDisplayText(inputValue);
        setInputValue('');
    };

    const handleAddItem = () => {
        const newItem = `Item ${items.length + 1}`;
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <div className={styles.e2eExample}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2 data-testid="page-title">E2E Testing Demo</h2>
                    <p>
                        Esta página contém elementos projetados especificamente para demonstrar testes End-to-End (E2E).
                        Use-a para verificar interações de usuário, preenchimento de formulários e manipulação de DOM.
                    </p>
                </div>
                <Link to="/modern">
                    <Button variant="secondary" size="sm">
                        ← Voltar
                    </Button>
                </Link>
            </div>

            <div className={styles.grid}>
                {/* Counter Section */}
                <section className={styles.card}>
                    <h3>Contador Interativo</h3>
                    <div className={styles.cardContent}>
                        <div className={styles.row}>
                            <p data-testid="count-display">Contagem atual: {count}</p>
                            <Button
                                onClick={() => setCount(c => c + 1)}
                                data-testid="increment-btn"
                                size="sm"
                            >
                                Incrementar
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className={styles.card}>
                    <h3>Interação com Formulário</h3>
                    <div className={styles.cardContent}>
                        <div>
                            <label htmlFor="input-text" className={styles.label}>Digite algo:</label>
                            <div className={styles.row}>
                                <input
                                    id="input-text"
                                    type="text"
                                    className={styles.input}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    data-testid="text-input"
                                    placeholder="Texto de teste"
                                />
                                <Button
                                    onClick={handleUpdateText}
                                    data-testid="update-text-btn"
                                    disabled={!inputValue}
                                    size="sm"
                                >
                                    Atualizar
                                </Button>
                            </div>
                        </div>

                        {displayText && (
                            <div className={styles.resultBox}>
                                <p className={styles.resultLabel}>Texto exibido:</p>
                                <p className={styles.resultValue} data-testid="display-text">
                                    {displayText}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* List Section */}
                <section className={styles.card}>
                    <h3>Lista Dinâmica</h3>
                    <div className={styles.cardContent}>
                        <Button onClick={handleAddItem} data-testid="add-item-btn" size="sm">
                            Adicionar Item
                        </Button>

                        <ul className={styles.list} data-testid="item-list">
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className={styles.listItem}
                                    data-testid="list-item"
                                >
                                    <span>{item}</span>
                                    <button
                                        onClick={() => handleRemoveItem(index)}
                                        className={styles.removeBtn}
                                        data-testid={`remove-item-${index}`}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {items.length === 0 && (
                            <p className={styles.emptyMsg} data-testid="empty-list-msg">
                                A lista está vazia.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
