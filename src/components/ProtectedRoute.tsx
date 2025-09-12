import { useAuthStore } from "@/context/auth.context";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles?: string[];
};

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const PrivateRoute = ({
  children,
  roles = ["Usuario"],
}: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = roles.some((role) => user.user.roles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
};
