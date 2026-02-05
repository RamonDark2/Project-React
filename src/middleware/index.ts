// middlewares/index.ts - VERSÃO SIMPLIFICADA (SEM TOKEN)

import {
  Middleware,
  RouteContext,
  ValidationSchema,
  CacheOptions,
  RateLimitOptions,
} from '../types/router.types';

/**
 * Biblioteca de Middlewares para React Router
 * VERSÃO SIMPLIFICADA - Apenas verifica usuário, não requer token
 */
export class Middlewares {
  /**
   * Middleware de autenticação SIMPLIFICADO
   * Verifica apenas se existe usuário no localStorage (sem token)
   */
  static auth: Middleware = async (context, next) => {
    const userString = localStorage.getItem('user');

    if (!userString) {
      context.redirected = true;
      context.navigate('/login');
      return;
    }

    try {
      context.user = JSON.parse(userString);
      await next();
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      context.redirected = true;
      context.navigate('/login');
    }
  };

  /**
   * Middleware de logging
   * Registra informações sobre cada navegação
   */
  static logger: Middleware = async (context, next) => {
    const startTime = performance.now();

    console.log(`[${new Date().toISOString()}] Navegando para: ${context.path}`);
    console.log('Parâmetros:', context.params);
    console.log('Query:', context.query);

    await next();

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    console.log(`[${new Date().toISOString()}] Rota processada em ${duration}ms`);
  };

  /**
   * Middleware para verificar permissões/roles
   * @param requiredRoles - Array de roles necessárias
   */
  static requireRole(requiredRoles: string[]): Middleware {
    return async (context, next) => {
      const user = context.user;

      if (!user) {
        context.redirected = true;
        context.navigate('/login');
        return;
      }

      const userRoles = user.roles || [];
      const hasPermission = requiredRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasPermission) {
        context.redirected = true;
        context.navigate('/403'); // Forbidden
        return;
      }

      await next();
    };
  }

  /**
   * Middleware de validação de parâmetros
   * @param schema - Schema de validação
   */
  static validateParams(schema: ValidationSchema): Middleware {
    return async (context, next) => {
      const errors: string[] = [];

      for (const [key, rules] of Object.entries(schema)) {
        const value = context.params[key];

        // Validação: required
        if (rules.required && !value) {
          errors.push(`Parâmetro '${key}' é obrigatório`);
          continue;
        }

        if (!value) continue;

        // Validação: type
        if (rules.type === 'number' && isNaN(Number(value))) {
          errors.push(`Parâmetro '${key}' deve ser um número`);
        }

        // Validação: pattern
        if (rules.pattern && !rules.pattern.test(value)) {
          errors.push(`Parâmetro '${key}' tem formato inválido`);
        }

        // Validação: min/max
        if (rules.type === 'number') {
          const numValue = Number(value);
          if (rules.min !== undefined && numValue < rules.min) {
            errors.push(`Parâmetro '${key}' deve ser >= ${rules.min}`);
          }
          if (rules.max !== undefined && numValue > rules.max) {
            errors.push(`Parâmetro '${key}' deve ser <= ${rules.max}`);
          }
        }

        // Validação customizada
        if (rules.custom) {
          const result = rules.custom(value);
          if (result !== true) {
            errors.push(typeof result === 'string' ? result : `Parâmetro '${key}' inválido`);
          }
        }
      }

      if (errors.length > 0) {
        context.data.validationErrors = errors;
        context.redirected = true;
        console.error('Erros de validação:', errors);
        context.navigate('/error?type=validation');
        return;
      }

      await next();
    };
  }

  /**
   * Middleware de cache
   * @param options - Opções de cache
   */
  static cache(options: CacheOptions = {}): Middleware {
    const { ttl = 60000 } = options;
    const cacheStore = new Map<string, { content: any; timestamp: number }>();

    return async (context, next) => {
      const cacheKey = options.key || `${context.path}:${JSON.stringify(context.query)}`;
      const cached = cacheStore.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log('Servindo do cache:', cacheKey);
        context.data.cached = cached.content;
        return;
      }

      await next();

      // Armazena dados no cache
      if (context.data.cacheableData) {
        cacheStore.set(cacheKey, {
          content: context.data.cacheableData,
          timestamp: Date.now(),
        });
      }
    };
  }

  /**
   * Middleware de rate limiting
   * @param options - Opções de rate limit
   */
  static rateLimit(options: RateLimitOptions): Middleware {
    const { maxRequests, windowMs, keyGenerator } = options;
    const requests = new Map<string, number[]>();

    return async (context, next) => {
      const key = keyGenerator
        ? keyGenerator(context)
        : context.user?.id || 'anonymous';

      const now = Date.now();
      const userRequests = requests.get(key) || [];

      // Remove requisições antigas
      const validRequests = userRequests.filter((time) => now - time < windowMs);

      if (validRequests.length >= maxRequests) {
        context.redirected = true;
        context.data.rateLimitExceeded = true;
        console.warn('Rate limit excedido para:', key);
        context.navigate('/error?type=ratelimit');
        return;
      }

      validRequests.push(now);
      requests.set(key, validRequests);

      await next();
    };
  }

  /**
   * Middleware de analytics
   * Rastreia pageviews
   */
  static analytics: Middleware = async (context, next) => {
    // Integração com Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: context.path,
        page_title: document.title,
      });
    }

    // Você pode adicionar outros serviços de analytics aqui
    console.log('Analytics: Pageview registrado -', context.path);

    await next();
  };

  /**
   * Middleware para definir meta tags
   * @param meta - Meta informações
   */
  static setMeta(meta: { title?: string; description?: string }): Middleware {
    return async (_context, next) => {
      if (meta.title) {
        document.title = meta.title;
      }

      if (meta.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', meta.description);
      }

      await next();
    };
  }

  /**
   * Middleware de redirecionamento condicional
   * @param condition - Função que retorna se deve redirecionar
   * @param targetPath - Caminho de destino
   */
  static redirect(
    condition: (context: RouteContext) => boolean,
    targetPath: string
  ): Middleware {
    return async (context, next) => {
      if (condition(context)) {
        context.redirected = true;
        context.navigate(targetPath);
        return;
      }
      await next();
    };
  }

  /**
   * Middleware de loading state
   * Define flag de loading no contexto
   */
  static loading: Middleware = async (context, next) => {
    context.data.isLoading = true;
    
    try {
      await next();
    } finally {
      context.data.isLoading = false;
    }
  };

  /**
   * Middleware para carregar dados antes da rota
   * @param loader - Função que carrega os dados
   */
  static loadData<T>(
    loader: (context: RouteContext) => Promise<T>
  ): Middleware {
    return async (context, next) => {
      try {
        context.data.loadedData = await loader(context);
        await next();
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        context.data.loadError = error;
        throw error;
      }
    };
  }

  /**
   * Middleware para prevenir acesso de usuários já autenticados
   * Útil para páginas de login/registro
   * VERSÃO SIMPLIFICADA - Apenas verifica se existe usuário
   */
static guest: Middleware = async (context, next) => {
  console.log('🔍 Guest middleware - path:', context.path);
  const userString = localStorage.getItem('user');
  console.log('🔍 User encontrado:', !!userString);

  if (userString) {
    try {
      const user = JSON.parse(userString);
      
      if (user?.email) {
        console.log('🔍 Redirecionando usuário autenticado para /');
        context.redirected = true;
        context.navigate('/');
        return;
      }
    } catch {
      localStorage.removeItem('user');
    }
  }

  await next();
};



  /**
   * Middleware de timeout
   * @param ms - Tempo máximo em milissegundos
   */
  static timeout(ms: number): Middleware {
    return async (_context, next) => {
      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na rota')), ms);
      });

      try {
        await Promise.race([next(), timeoutPromise]);
      } catch (error) {
        console.error('Timeout excedido:', ms, 'ms');
        throw error;
      }
    };
  }

  /**
   * Middleware para log de erros
   */
  static errorLogger: Middleware = async (context, next) => {
    try {
      await next();
    } catch (error) {
      console.error('[Error Logger] Erro na rota:', context.path);
      console.error('[Error Logger] Erro:', error);
      
      // Você pode enviar para um serviço de monitoramento aqui
      // Ex: Sentry, LogRocket, etc.
      
      throw error;
    }
  };

  /**
   * Middleware para scroll to top
   */
  static scrollToTop: Middleware = async (_context, next) => {
    window.scrollTo(0, 0);
    console.log('Scroll para o topo');
    await next();
  };

  /**
   * Middleware de desenvolvimento (apenas em dev)
   */
  static devOnly: Middleware = async (context, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 [DEV] Contexto:', context);
    }
    await next();
  };
}

export default Middlewares;