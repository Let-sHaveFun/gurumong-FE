import { useDormungStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function FirstVisitCheckProvider({ children }: { children: React.ReactNode }) {
  const isFirstVisit = useDormungStore((state) => state.isFirstVisit);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFirstVisit) {
      navigate('/splash');
    }
  }, [isFirstVisit, navigate]);

  return <>{children}</>;
}
