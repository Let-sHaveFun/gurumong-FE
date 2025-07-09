import { QueryProvider } from '@/app/QueryProvider';
import { Routes } from '@/pages/Routes';

export default function App() {
  return (
    <QueryProvider>
      <Routes />
    </QueryProvider>
  );
}
