import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
