// components/Router/Router.tsx

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  RouteContext,
  RouteConfig,
  RouterProps,
  Middleware,
} from '../../types/router.types';

/**
 * Componente Router principal
 * Gerencia navegação e execução de middlewares
 */
const Router: React.FC<RouterProps> = ({
  routes,
  globalMiddlewares = [],
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
}) => {
  const [currentPath, setCurrentPath] = useState(
    window.location.hash.slice(1) || '/'
  );
  const [context, setContext] = useState<RouteContext | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const extractParams = useCallback(
    (pattern: string, path: string): Record<string, string> => {
      const paramNames: string[] = [];
      const regexPattern = pattern
        .split('/')
        .map((segment) => {
          if (segment.startsWith(':')) {
            paramNames.push(segment.slice(1));
            return '([^/]+)';
          }
          return segment;
        })
        .join('/');

      const regex = new RegExp(`^${regexPattern}$`);
      const match = path.match(regex);

      if (!match) return {};

      const params: Record<string, string> = {};
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });

      return params;
    },
    []
  );

  const parseQuery = useCallback((): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const query: Record<string, string> = {};

    params.forEach((value, key) => {
      query[key] = value;
    });

    return query;
  }, []);

  const findMatchingRoute = useCallback(
    (path: string): RouteConfig | null => {
      return (
        routes.find((route) => {
          if (route.exact) {
            return route.path === path;
          }

          const pattern = route.path
            .split('/')
            .map((segment) => (segment.startsWith(':') ? '[^/]+' : segment))
            .join('/');

          const regex = new RegExp(`^${pattern}$`);
          return regex.test(path);
        }) || null
      );
    },
    [routes]
  );

  const navigate = useCallback((path: string) => {
    console.log('🔵 Router.navigate chamado:', path);
    const cleanPath = path.startsWith('#') ? path.slice(1) : path;
    window.location.hash = cleanPath;
    setCurrentPath(cleanPath);
  }, []);

  const executeMiddlewares = useCallback(
    async (middlewares: Middleware[], ctx: RouteContext): Promise<void> => {
      let index = 0;

      const next = async (): Promise<void> => {
        if (index >= middlewares.length) return;

        const middleware = middlewares[index++];
        await middleware(ctx, next);
      };

      await next();
    },
    []
  );

  const processRoute = useCallback(
    async (path: string) => {
      console.log('🔵 Processando rota:', path);
      setIsProcessing(true);
      setError(null);

      try {
        const matchedRoute = findMatchingRoute(path);

        if (!matchedRoute) {
          console.log('🔴 Rota não encontrada');
          setContext(null);
          setIsProcessing(false);
          return;
        }

        console.log('✅ Rota encontrada:', matchedRoute.path);

        const params = extractParams(matchedRoute.path, path);
        const query = parseQuery();

        const routeContext: RouteContext = {
          path,
          params,
          query,
          data: {},
          navigate,
          redirected: false,
        };

        const allMiddlewares = [
          ...globalMiddlewares,
          ...(matchedRoute.middlewares || []),
        ];

        console.log('🔵 Executando middlewares...');
        await executeMiddlewares(allMiddlewares, routeContext);

        if (!routeContext.redirected) {
          console.log('✅ Contexto definido');
          setContext(routeContext);
        }
      } catch (err) {
        console.error('🔴 Erro ao processar rota:', err);
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        setIsProcessing(false);
      }
    },
    [
      findMatchingRoute,
      extractParams,
      parseQuery,
      navigate,
      globalMiddlewares,
      executeMiddlewares,
    ]
  );

  useEffect(() => {
    console.log('🟢 useEffect disparado - currentPath:', currentPath);
    processRoute(currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  useEffect(() => {
    console.log('🟢 Registrando listener de hashchange');
    
    const handleHashChange = () => {
      const newPath = window.location.hash.slice(1) || '/';
      console.log('🟡 Hash mudou! Novo path:', newPath);
      setCurrentPath(newPath);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      console.log('🔴 Removendo listener de hashchange');
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const CurrentComponent = useMemo(() => {
    if (error && ErrorComponent) {
      return <ErrorComponent error={error} />;
    }

    if (!context || isProcessing) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      );
    }

    const matchedRoute = findMatchingRoute(context.path);

    if (!matchedRoute) {
      return NotFound ? (
        <NotFound />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">Página não encontrada</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar para Home
            </button>
          </div>
        </div>
      );
    }

    const Component = matchedRoute.component;
    return <Component context={context} />;
  }, [context, error, isProcessing, findMatchingRoute, navigate, ErrorComponent, NotFound]);

  return <>{CurrentComponent}</>;
};

// ✅ EXPORT DEFAULT - Esta é a linha mais importante!
export default Router;