import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Desplaza hacia arriba cuando cambia la ruta
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; // No renderiza nada
};

