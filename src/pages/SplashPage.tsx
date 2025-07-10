import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import splashImage from '@/assets/splash.png';

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
  }, [navigate]);

  return (
    <div className="relative h-screen w-full">
      <img src={splashImage} alt="Gurumong Splash Screen" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}
