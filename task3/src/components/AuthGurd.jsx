import { isTokenExpire } from "@/api";
import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGurdRoute = () => {
  const { token, refreshToken, clear } = useAuthStore();
  const location = useLocation();

  const isLoggedIn = Boolean(token);
  const refreshExpired = isTokenExpire(refreshToken);

  if (!isLoggedIn || refreshExpired) {
    clear();
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  return <Outlet />;
};

export default AuthGurdRoute;
