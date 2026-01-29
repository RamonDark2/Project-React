// types/router.types.ts

import { ReactNode } from 'react';

/**
 * Contexto passado para middlewares e componentes de rota
 */
export interface RouteContext {
  path: string;
  params: Record<string, string>;
  query: Record<string, string>;
  data: Record<string, any>;
  user?: User | null;
  navigate: (path: string) => void;
  redirected: boolean;
}

/**
 * Dados do usuário autenticado
 */
export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  [key: string]: any;
}

/**
 * Função middleware
 */
export type Middleware = (
  context: RouteContext,
  next: () => Promise<void>
) => Promise<void>;

/**
 * Configuração de uma rota
 */
export interface RouteConfig {
  path: string;
  component: React.ComponentType<{ context: RouteContext }>;
  middlewares?: Middleware[];
  meta?: RouteMeta;
  exact?: boolean;
}

/**
 * Meta informações da rota
 */
export interface RouteMeta {
  title?: string;
  description?: string;
  requiresAuth?: boolean;
  roles?: string[];
  [key: string]: any;
}

/**
 * Props do componente Router
 */
export interface RouterProps {
  routes: RouteConfig[];
  globalMiddlewares?: Middleware[];
  notFoundComponent?: React.ComponentType;
  errorComponent?: React.ComponentType<{ error: Error }>;
}

/**
 * Schema de validação de parâmetros
 */
export interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    type?: 'string' | 'number' | 'boolean';
    pattern?: RegExp;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean | string;
  };
}

/**
 * Opções de cache
 */
export interface CacheOptions {
  ttl?: number; // Time to live em milissegundos
  key?: string;
}

/**
 * Opções de rate limiting
 */
export interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (context: RouteContext) => string;
}