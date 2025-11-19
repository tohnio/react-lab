import { useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, CartContextValue } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { CartContext } from './cartContextDefinition';

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Provider do CartContext
 * Gerencia o estado do carrinho com persistência no localStorage
 *
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export function CartProvider({ children }: CartProviderProps) {
  // Persiste os itens do carrinho no localStorage
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  /**
   * Adiciona um item ao carrinho
   * Se o item já existe, incrementa a quantidade
   * Se é novo, adiciona com quantidade 1
   * Usa useCallback para evitar recriação da função em cada render
   */
  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((i: CartItem) => i.id === item.id);

      if (existingItem) {
        // Se o item já existe, incrementa a quantidade
        return prevItems.map((i: CartItem) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      // Adiciona novo item com quantidade 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }, [setItems]);

  /**
   * Remove um item do carrinho pelo ID
   * Usa useCallback para evitar recriação da função em cada render
   */
  const removeItem = useCallback((id: string) => {
    setItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.id !== id));
  }, [setItems]);

  /**
   * Atualiza a quantidade de um item
   * Se a quantidade for <= 0, remove o item
   * Usa useCallback para evitar recriação da função em cada render
   */
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.id !== id));
      return;
    }

    setItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [setItems]);

  /**
   * Remove todos os itens do carrinho
   * Usa useCallback para evitar recriação da função em cada render
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  /**
   * Calcula o total do carrinho
   * Usa useMemo para otimização - só recalcula quando items mudar
   * Evita cálculos desnecessários em cada re-render
   */
  const total = useMemo(() => {
    return items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
