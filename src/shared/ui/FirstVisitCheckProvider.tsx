import { useDormungStore } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function FirstVisitCheckProvider({ children }: { children: React.ReactNode }) {
  const isFirstVisit = useDormungStore((state) => state.isFirstVisit);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isFirstVisit && location.pathname === '/') {
      navigate('/splash');
    }
  }, [isFirstVisit, navigate, location.pathname]);

  return <>{children}</>;
}
