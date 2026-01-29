// hooks/useRouter.ts

import { useCallback, useMemo } from 'react';

/**
 * Hook personalizado para navegação e informações da rota
 */
export const useRouter = () => {
  /**
   * Navega para uma nova rota
   */
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  /**
   * Navega substituindo a entrada atual do histórico
   */
  const replace = useCallback((path: string) => {
    window.history.replaceState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  /**
   * Volta para a página anterior
   */
  const back = useCallback(() => {
    window.history.back();
  }, []);

  /**
   * Avança para a próxima página
   */
  const forward = useCallback(() => {
    window.history.forward();
  }, []);

  /**
   * Informações da URL atual
   */
  const location = useMemo(() => {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
  }, []);

  /**
   * Parse dos parâmetros de query
   */
  const query = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const query: Record<string, string> = {};

    params.forEach((value, key) => {
      query[key] = value;
    });

    return query;
  }, []);

  return {
    navigate,
    replace,
    back,
    forward,
    location,
    query,
  };
};

export default useRouter;