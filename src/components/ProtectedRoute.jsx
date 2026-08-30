import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/zustand/store';

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;