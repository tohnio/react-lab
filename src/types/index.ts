// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Cart types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
  clearCart: () => void;
}

// Auth types
export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// API Response types
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Weather {
  temp: number;
  description: string;
  humidity: number;
  city: string;
}

// Form types
export interface LoginFormData extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  message: string;
}

export interface RegistrationFormData extends Record<string, unknown> {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Todo types
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export interface CounterProps {
  initialValue?: number;
  step?: number;
}

export interface TodoListProps {
  initialTodos?: Todo[];
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export interface HeaderProps {
  title: string;
  showThemeToggle?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
