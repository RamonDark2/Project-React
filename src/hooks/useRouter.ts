import { useCallback, useState, useEffect } from 'react';

/**
 * Hook personalizado para navegação e informações da rota
 * ADAPTADO PARA HASHROUTER
 */
export const useRouter = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * Navega para uma nova rota usando hash
   */
  const navigate = useCallback((path: string) => {
    console.log('🔵 useRouter.navigate chamado:', path);
    console.log('🔵 Hash atual:', window.location.hash);
    
    // ✅ CRÍTICO: Adiciona o # se não tiver
    const newHash = path.startsWith('#') ? path : `#${path}`;
    
    console.log('🔵 Novo hash:', newHash);
    window.location.hash = newHash;
    
    console.log('🔵 Hash depois:', window.location.hash);
  }, []);

  /**
   * Navega substituindo a entrada atual do histórico
   */
  const replace = useCallback((path: string) => {
    const newHash = path.startsWith('#') ? path : `#${path}`;
    const currentUrl = window.location.href.split('#')[0];
    window.location.replace(`${currentUrl}${newHash}`);
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
  const location = useCallback(() => {
    const hash = currentHash.slice(1) || '/';
    const [pathname, search] = hash.split('?');
    
    return {
      pathname: pathname || '/',
      search: search ? `?${search}` : '',
      hash: currentHash,
    };
  }, [currentHash]);

  /**
   * Parse dos parâmetros de query
   */
  const query = useCallback(() => {
    const hash = currentHash.slice(1);
    const searchString = hash.split('?')[1] || '';
    const params = new URLSearchParams(searchString);
    const queryObj: Record<string, string> = {};

    params.forEach((value, key) => {
      queryObj[key] = value;
    });

    return queryObj;
  }, [currentHash]);

  return {
    navigate,
    replace,
    back,
    forward,
    location: location(),
    query: query(),
  };
};

export default useRouter;