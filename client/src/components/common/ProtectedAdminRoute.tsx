import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
    const { user, loading } = useAuthContext();

    if (loading) {
        return <div className="loading-page">Loading...</div>;
    }

    if (!user || user.email !== ADMIN_EMAIL) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
