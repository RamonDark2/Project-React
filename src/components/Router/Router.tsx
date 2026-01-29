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
export const Router: React.FC<RouterProps> = ({
  routes,
  globalMiddlewares = [],
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [context, setContext] = useState<RouteContext | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  /**
   * Extrai parâmetros da URL baseado no padrão da rota
   */
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

  /**
   * Parse query string da URL
   */
  const parseQuery = useCallback((): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const query: Record<string, string> = {};

    params.forEach((value, key) => {
      query[key] = value;
    });

    return query;
  }, []);

  /**
   * Encontra a rota que corresponde ao path atual
   */
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

  /**
   * Função de navegação
   */
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  }, []);

  /**
   * Executa chain de middlewares
   */
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

  /**
   * Processa a rota atual
   */
  const processRoute = useCallback(
    async (path: string) => {
      setIsProcessing(true);
      setError(null);

      try {
        const matchedRoute = findMatchingRoute(path);

        if (!matchedRoute) {
          setContext(null);
          setIsProcessing(false);
          return;
        }

        // Cria contexto da rota
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

        // Combina middlewares globais e específicos da rota
        const allMiddlewares = [
          ...globalMiddlewares,
          ...(matchedRoute.middlewares || []),
        ];

        // Executa middlewares
        await executeMiddlewares(allMiddlewares, routeContext);

        // Se houve redirecionamento, não atualiza o contexto
        if (!routeContext.redirected) {
          setContext(routeContext);
        }
      } catch (err) {
        console.error('Erro ao processar rota:', err);
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

  /**
   * Efeito para processar mudanças de rota
   */
  useEffect(() => {
    processRoute(currentPath);
  }, [currentPath, processRoute]);

  /**
   * Efeito para escutar mudanças de histórico (botões voltar/avançar)
   */
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  /**
   * Componente da rota atual
   */
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

export default Router;