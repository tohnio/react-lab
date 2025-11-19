import { useContext } from 'react';
import { CartContext } from '../context/cartContextDefinition';
import type { CartContextValue } from '../types';

/**
 * Hook para acessar o CartContext
 *
 * @returns Objeto com itens do carrinho e funções de manipulação
 * @throws Error se usado fora do CartProvider
 *
 * @example
 * const { items, addItem, removeItem, total } = useCart();
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
