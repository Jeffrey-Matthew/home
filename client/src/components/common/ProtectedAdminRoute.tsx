import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ADMIN_EMAIL = 'jeffenz3110@gmail.com';

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
