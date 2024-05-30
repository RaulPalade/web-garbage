import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import generalAnimation from "../../../assets/lotties/generalAnimation.json";
import { CircularLoaderComponent } from "../../components/loaders/CircularLoaderComponent";

export function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoaderComponent
          animation={generalAnimation}
          message={"Caricamento in corso"}
        />
      </div>
    );
  }

  if (!loggedIn) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
}
