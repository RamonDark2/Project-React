// App.tsx

import React from 'react';
import Router from './components/Router/Router';
import { RouteConfig } from './types/router.types';
import Middlewares from './middleware/index';

// Importar páginas
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

/**
 * Configuração de todas as rotas da aplicação
 */
const routes: RouteConfig[] = [
  // Rota: Home
  {
    path: '/',
    component: Home,
    exact: true,
    middlewares: [
      Middlewares.scrollToTop,
      Middlewares.setMeta({
        title: 'Home - MyApp',
        description: 'Home',
      }),
    ],
  },

  {
    path: '/login',
    component: Login,
    middlewares: [
      Middlewares.guest, 
      Middlewares.setMeta({ title: 'Login' }),
    ],
  },

];

/**
 * Componente principal da aplicação
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router
        routes={routes}
        globalMiddlewares={[
          Middlewares.logger,
          Middlewares.analytics,
          Middlewares.errorLogger,
        ]}
        notFoundComponent={NotFound}
        errorComponent={ErrorPage}
      />
    </div>
  );
}

export default App;