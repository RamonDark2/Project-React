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
import SobreMim from './pages/SobreMim';

/**
 * Configuração de todas as rotas da aplicação
 */
const routes: RouteConfig[] = [
  {
    path: '/',
    component: SobreMim,
    exact: true,
    middlewares: [
      Middlewares.scrollToTop,
      Middlewares.setMeta({
        title: 'Meu Portfolio',
        description: 'Portfólio pessoal de Ramon Rodrigues - Desenvolvedor Front-End',
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

  {
    path: '/landing-page',
    component: Home,
    middlewares: [
      Middlewares.setMeta({ title: 'Landing Page' }),
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