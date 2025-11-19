import { createContext } from 'react';
import type { CartContextValue } from '../types';

/**
 * Context para gerenciamento do carrinho de compras
 * Fornece funcionalidades CRUD para itens do carrinho com persistência
 */
export const CartContext = createContext<CartContextValue | undefined>(undefined);
