// components/Router/Link.tsx

import React, { MouseEvent, ReactNode } from 'react';
import { useRouter } from '../../hooks/useRouter';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  replace?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Componente Link para navegação SPA
 */
export const Link: React.FC<LinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  replace = false,
  onClick,
}) => {
  const { navigate, replace: replaceRoute, location } = useRouter();

  const isActive = location.pathname === to;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Chama callback customizado se fornecido
    if (onClick) {
      onClick(e);
    }

    // Navega para a rota
    if (replace) {
      replaceRoute(to);
    } else {
      navigate(to);
    }
  };

  const finalClassName = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <a href={to} onClick={handleClick} className={finalClassName}>
      {children}
    </a>
  );
};

export default Link;