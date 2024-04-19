import { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
    const location = useLocation();
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (role && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;

}