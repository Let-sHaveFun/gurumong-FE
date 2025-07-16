import type { ErrorBoundaryFallbackProps } from '@suspensive/react';
import { useNavigate } from 'react-router-dom';

export function ErrorFallback({ error, reset }: ErrorBoundaryFallbackProps) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>🚨 에러 발생!</h2>
      <pre>{error.message}</pre>
      <button onClick={reset}>🔄 다시 시도</button>
      <button onClick={() => navigate('/')}>🏡 홈으로 이동</button>
    </div>
  );
}
