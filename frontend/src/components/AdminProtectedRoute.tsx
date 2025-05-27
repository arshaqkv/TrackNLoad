import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";


interface AdminProtectedRouteProps {
  role?: string;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ role }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
