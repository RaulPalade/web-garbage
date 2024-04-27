import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { LoaderView } from "../components/LoaderView";

export function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <LoaderView />;
  }

  if (!loggedIn) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
}
