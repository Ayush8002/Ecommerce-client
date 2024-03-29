import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated?: boolean;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?:string;
  redirectAdmin?: string;
}

const ProtectedRoute = ({
  children,
  isAuthenticated,
  adminRoute,
  isAdmin,
  redirect = "/login",
  redirectAdmin = "/profile",
}:Props) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to={redirectAdmin} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;