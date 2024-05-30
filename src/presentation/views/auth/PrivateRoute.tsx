import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { LoaderView } from "../../components/LoaderView";
import generalAnimation from "../../../assets/lotties/generalAnimation.json";

export function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <LoaderView
        animation={generalAnimation}
        message={"Caricamento in corso..."}
        open={false}
        onClose={() => console.log("CIAOOO")}
      />
    );
  }

  if (!loggedIn) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
}
