import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <span data-testid="count">{count}</span>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
        </div>
    );
}

describe('Counter Component', () => {
    it('should increment counter when button is clicked', () => {
        render(<Counter />);

        const countElement = screen.getByTestId('count');
        const button = screen.getByText('Increment');

        expect(countElement).toHaveTextContent('0');

        fireEvent.click(button);

        expect(countElement).toHaveTextContent('1');
    });
});
