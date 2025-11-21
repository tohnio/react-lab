import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './hooks/useAuth';
import Loading from './components/common/Loading';

// Eager load Home page for better initial load experience
import Home from './pages/Home';

// Lazy load other pages for code splitting
const Components = lazy(() => import('./pages/Components'));
const Hooks = lazy(() => import('./pages/Hooks'));
const Forms = lazy(() => import('./pages/Forms'));
const ApiDemo = lazy(() => import('./pages/ApiDemo'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));



// Modern Stack Examples
const ModernTech = lazy(() => import('./pages/examples/ModernTech'));
const QueryExample = lazy(() => import('./pages/examples/QueryExample'));
const FormExample = lazy(() => import('./pages/examples/FormExample'));
const ZustandExample = lazy(() => import('./pages/examples/ZustandExample'));
const TailwindExample = lazy(() => import('./pages/examples/TailwindExample'));
const E2EExample = lazy(() => import('./pages/examples/E2EExample'));

/**
 * ProtectedRoute component that checks authentication status
 * Redirects to home page if user is not authenticated
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

/**
 * Wrapper component that provides Suspense boundary for lazy-loaded routes
 */
interface SuspenseWrapperProps {
  children: ReactNode;
}

function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<Loading size="lg" text="Carregando página..." />}>
      {children}
    </Suspense>
  );
}

/**
 * Router configuration using React Router v6
 * Includes lazy loading, protected routes, and 404 fallback
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/components',
    element: (
      <SuspenseWrapper>
        <Components />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/hooks',
    element: (
      <SuspenseWrapper>
        <Hooks />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/forms',
    element: (
      <SuspenseWrapper>
        <Forms />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/api-demo',
    element: (
      <SuspenseWrapper>
        <ApiDemo />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/protected',
    element: (
      <SuspenseWrapper>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user/:id',
    element: (
      <SuspenseWrapper>
        <UserProfile />
      </SuspenseWrapper>
    ),
  },
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/modern',
    element: (
      <SuspenseWrapper>
        <ModernTech />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/modern/query',
    element: (
      <SuspenseWrapper>
        <QueryExample />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/modern/form',
    element: (
      <SuspenseWrapper>
        <FormExample />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/modern/zustand',
    element: (
      <SuspenseWrapper>
        <ZustandExample />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/modern/tailwind',
    element: (
      <SuspenseWrapper>
        <TailwindExample />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/modern/e2e',
    element: (
      <SuspenseWrapper>
        <E2EExample />
      </SuspenseWrapper>
    ),
  },
]);
