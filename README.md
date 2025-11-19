# 🎓 React Learning App

Um projeto educacional completo para aprender ReactJS através de exemplos práticos e interativos. Este projeto demonstra conceitos fundamentais e avançados do React, incluindo hooks, gerenciamento de estado, roteamento, integração com APIs e muito mais.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Conceitos React Demonstrados](#conceitos-react-demonstrados)
- [Funcionalidades](#funcionalidades)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)
- [Recursos de Aprendizado](#recursos-de-aprendizado)

## 🎯 Sobre o Projeto

Este projeto foi criado como uma ferramenta de aprendizado prática para desenvolvedores que desejam dominar ReactJS. Cada funcionalidade foi implementada seguindo as melhores práticas da comunidade React, com código limpo, bem documentado e fácil de entender.

### Objetivos de Aprendizado

- ✅ Compreender componentes funcionais e hooks
- ✅ Dominar gerenciamento de estado local e global
- ✅ Implementar roteamento em Single Page Applications
- ✅ Integrar com APIs externas
- ✅ Criar custom hooks reutilizáveis
- ✅ Trabalhar com formulários e validação
- ✅ Aplicar TypeScript em projetos React
- ✅ Implementar temas e estilização moderna
- ✅ Otimizar performance com memoization

## 🚀 Tecnologias

### Core

- **[React 19](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool moderna e extremamente rápida

### Bibliotecas

- **[React Router v7](https://reactrouter.com/)** - Roteamento declarativo para SPAs
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições de API

### Ferramentas de Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linter para qualidade e consistência de código
- **[Prettier](https://prettier.io/)** - Formatador de código automático
- **React Compiler** - Compilador experimental do React para otimizações

### APIs Públicas Utilizadas

- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** - API REST fake para testes
- **[OpenWeather API](https://openweathermap.org/api)** - API de dados meteorológicos

## 📁 Estrutura do Projeto

```
react-learning-app/
├── public/                 # Arquivos estáticos
│   └── favicon.ico
│
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── common/        # Componentes genéricos
│   │   │   ├── Button/    # Botão com variants e estados
│   │   │   ├── Card/      # Card container reutilizável
│   │   │   ├── Loading/   # Spinner de loading
│   │   │   ├── Modal/     # Modal com animações
│   │   │   └── ErrorBoundary.tsx  # Tratamento de erros
│   │   │
│   │   ├── features/      # Componentes de funcionalidades
│   │   │   ├── Counter/   # Contador interativo
│   │   │   ├── TodoList/  # Lista de tarefas com CRUD
│   │   │   └── SearchBar/ # Busca com debounce
│   │   │
│   │   └── layout/        # Componentes de layout
│   │       ├── Header/    # Cabeçalho com navegação
│   │       └── Sidebar/   # Menu lateral
│   │
│   ├── hooks/             # Custom hooks
│   │   ├── useLocalStorage.ts  # Sincronização com localStorage
│   │   ├── useFetch.ts         # Requisições HTTP com cache
│   │   ├── useForm.ts          # Gerenciamento de formulários
│   │   └── useDebounce.ts      # Debounce de valores
│   │
│   ├── context/           # Context providers para estado global
│   │   ├── ThemeContext.tsx    # Gerenciamento de tema
│   │   ├── AuthContext.tsx     # Autenticação
│   │   └── CartContext.tsx     # Carrinho de compras
│   │
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.tsx           # Página inicial
│   │   ├── Components.tsx     # Demonstração de componentes
│   │   ├── Hooks.tsx          # Exemplos de hooks
│   │   ├── Forms.tsx          # Formulários com validação
│   │   ├── ApiDemo.tsx        # Integração com APIs
│   │   ├── Dashboard.tsx      # Rota protegida
│   │   ├── UserProfile.tsx    # Rota com parâmetros
│   │   └── NotFound.tsx       # Página 404
│   │
│   ├── services/          # Serviços e API clients
│   │   ├── api.ts             # Classe base de API
│   │   ├── postsService.ts    # Serviço de posts
│   │   └── weatherService.ts  # Serviço de clima
│   │
│   ├── utils/             # Funções utilitárias
│   │   └── validators.ts      # Validadores de formulário
│   │
│   ├── types/             # TypeScript types e interfaces
│   │   └── index.ts
│   │
│   ├── styles/            # Estilos globais
│   │   ├── global.css         # Reset e estilos base
│   │   ├── variables.css      # Variáveis CSS (cores, espaçamentos)
│   │   └── animations.css     # Animações reutilizáveis
│   │
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Entry point
│   └── router.tsx         # Configuração de rotas
│
├── .env.example           # Exemplo de variáveis de ambiente
├── .eslintrc.json         # Configuração do ESLint
├── .prettierrc            # Configuração do Prettier
├── tsconfig.json          # Configuração do TypeScript
├── vite.config.ts         # Configuração do Vite
└── package.json           # Dependências e scripts
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório** (ou navegue até a pasta do projeto)

```bash
cd react-learning-app
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente** (opcional)

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas chaves de API se necessário.

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento com hot reload

# Build
npm run build        # Compila TypeScript e cria build de produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa ESLint para verificar problemas
npm run format       # Formata código com Prettier
npm run format:check # Verifica se o código está formatado
```

## 💡 Conceitos React Demonstrados

### 1. Componentes Funcionais

Todos os componentes são funcionais, utilizando a sintaxe moderna do React:

```tsx
function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}
```

### 2. Hooks Fundamentais

#### useState
Gerenciamento de estado local em componentes:

```tsx
const [count, setCount] = useState(0);
```

#### useEffect
Efeitos colaterais e sincronização:

```tsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

#### useContext
Acesso a contextos globais:

```tsx
const { theme, toggleTheme } = useTheme();
```

### 3. Custom Hooks

Hooks personalizados para reutilização de lógica:

- **useLocalStorage**: Sincroniza estado com localStorage
- **useFetch**: Gerencia requisições HTTP com cache
- **useForm**: Gerenciamento completo de formulários
- **useDebounce**: Debounce de valores para otimização

### 4. Context API

Gerenciamento de estado global sem bibliotecas externas:

- **ThemeContext**: Tema claro/escuro com persistência
- **AuthContext**: Autenticação simulada
- **CartContext**: Carrinho de compras com CRUD

### 5. React Router

Roteamento declarativo com:

- Rotas básicas e aninhadas
- Rotas protegidas (ProtectedRoute)
- Parâmetros dinâmicos (`:id`)
- Lazy loading de componentes
- Página 404 personalizada

### 6. TypeScript

Tipagem forte em todo o projeto:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function UserCard({ user }: { user: User }) {
  // ...
}
```

### 7. Formulários e Validação

Sistema completo de formulários com:

- Validação em tempo real
- Campos touched
- Mensagens de erro específicas
- Estados de submissão

### 8. Integração com APIs

Requisições HTTP com:

- Cache em memória
- Tratamento de erros
- Estados de loading
- Retry logic

### 9. Performance

Otimizações implementadas:

- **useMemo**: Memoização de cálculos pesados
- **useCallback**: Memoização de funções
- **React.lazy**: Code splitting e lazy loading
- Cache de requisições HTTP

### 10. Error Handling

Tratamento robusto de erros:

- ErrorBoundary para erros de renderização
- Try-catch em operações assíncronas
- Mensagens user-friendly
- Fallback UIs

## ✨ Funcionalidades

### Componentes Interativos

- ✅ **Counter**: Contador com incremento/decremento
- ✅ **TodoList**: Lista de tarefas com CRUD completo
- ✅ **SearchBar**: Busca com debounce automático
- ✅ **Modal**: Modal com animações e overlay
- ✅ **Theme Toggle**: Alternância entre tema claro/escuro

### Formulários

- ✅ **Login Form**: Formulário de login com validação
- ✅ **Contact Form**: Formulário de contato
- ✅ **Registration Form**: Cadastro com confirmação de senha

### Integrações

- ✅ **Posts API**: CRUD completo com JSONPlaceholder
- ✅ **Weather API**: Consulta de clima por cidade

### Navegação

- ✅ **Roteamento**: Navegação entre múltiplas páginas
- ✅ **Rotas Protegidas**: Acesso restrito com autenticação
- ✅ **Parâmetros Dinâmicos**: URLs com parâmetros

## 🎨 Boas Práticas Implementadas

### Arquitetura

- ✅ **Separação de Responsabilidades**: Componentes, hooks, services e utils separados
- ✅ **Composição**: Componentes pequenos e reutilizáveis
- ✅ **DRY**: Lógica reutilizada através de custom hooks
- ✅ **Single Responsibility**: Cada componente tem uma única responsabilidade

### Código

- ✅ **TypeScript**: Tipagem forte em todo o projeto
- ✅ **ESLint**: Regras de linting configuradas
- ✅ **Prettier**: Formatação automática de código
- ✅ **Comentários**: JSDoc em funções e componentes principais
- ✅ **Nomenclatura**: Nomes descritivos e consistentes

### Performance

- ✅ **Memoization**: useMemo e useCallback onde apropriado
- ✅ **Lazy Loading**: Code splitting de rotas
- ✅ **Cache**: Cache de requisições HTTP
- ✅ **Debounce**: Otimização de inputs de busca

### UX

- ✅ **Loading States**: Feedback visual durante operações
- ✅ **Error Messages**: Mensagens de erro claras
- ✅ **Validação**: Feedback imediato em formulários
- ✅ **Responsividade**: Layout adaptável a diferentes telas
- ✅ **Acessibilidade**: HTML semântico e ARIA attributes

### Estado

- ✅ **Context API**: Estado global organizado
- ✅ **Persistência**: localStorage para dados importantes
- ✅ **Imutabilidade**: Estado atualizado de forma imutável
- ✅ **Normalização**: Estruturas de dados normalizadas

## 📚 Recursos de Aprendizado

### Documentação Oficial

- [React Documentation](https://react.dev/) - Documentação oficial do React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guia completo de TypeScript
- [React Router](https://reactrouter.com/) - Documentação do React Router
- [Vite Guide](https://vitejs.dev/guide/) - Guia do Vite

### Tutoriais e Cursos

- [React Tutorial](https://react.dev/learn) - Tutorial oficial do React
- [TypeScript for React](https://react-typescript-cheatsheet.netlify.app/) - Cheatsheet de TypeScript com React
- [React Hooks](https://react.dev/reference/react) - Referência completa de hooks

### Artigos e Guias

- [React Best Practices](https://react.dev/learn/thinking-in-react) - Pensando em React
- [React Performance](https://react.dev/learn/render-and-commit) - Otimização de performance
- [React Patterns](https://reactpatterns.com/) - Padrões comuns em React

### Ferramentas

- [React DevTools](https://react.dev/learn/react-developer-tools) - Extensão para debug
- [TypeScript Playground](https://www.typescriptlang.org/play) - Playground online
- [Can I Use](https://caniuse.com/) - Compatibilidade de features

### Comunidade

- [React Discord](https://discord.gg/react) - Comunidade oficial no Discord
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs) - Perguntas e respostas
- [Reddit r/reactjs](https://www.reddit.com/r/reactjs/) - Comunidade no Reddit

## 🤝 Contribuindo

Este é um projeto educacional. Sinta-se livre para:

- Fazer fork do projeto
- Adicionar novos exemplos
- Melhorar a documentação
- Reportar bugs ou sugerir melhorias

## 📝 Licença

Este projeto é open source e está disponível para fins educacionais.

---

**Desenvolvido com ❤️ para aprender React**


## ⚡ Otimizações de Performance

Este projeto implementa várias otimizações de performance seguindo as melhores práticas do React:

### useMemo

Utilizado para memoizar cálculos custosos e evitar recalculações desnecessárias:

- **CartContext**: Cálculo do total do carrinho só é refeito quando os itens mudam
- **TodoList**: Contadores de tarefas completas e ativas são memoizados

```tsx
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [items]);
```

### useCallback

Utilizado para memoizar funções e evitar recriações em cada render:

- **CartContext**: Todas as operações CRUD (addItem, removeItem, updateQuantity, clearCart)
- **ThemeContext**: Função toggleTheme
- **TodoList**: Handlers de eventos (addTodo, removeTodo, toggleComplete, clearCompleted)
- **Counter**: Funções increment, decrement e reset
- **SearchBar**: Handler handleClear

```tsx
const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
  setItems((prevItems) => {
    // lógica de adicionar item
  });
}, [setItems]);
```

### Lazy Loading

Rotas são carregadas sob demanda usando React.lazy e Suspense:

```tsx
const Components = lazy(() => import('./pages/Components'));
const Hooks = lazy(() => import('./pages/Hooks'));
// ... outras rotas
```

### Code Splitting

O Vite automaticamente divide o código em chunks menores para otimizar o carregamento inicial.

### Responsive Design

Design mobile-first com breakpoints otimizados:
- **Mobile**: 320px+ (base)
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Extra Large**: 1280px+

---

**Desenvolvido com ❤️ para aprendizado de React**
