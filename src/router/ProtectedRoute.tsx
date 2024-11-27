import { Navigate, Outlet, OutletProps } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import Header from "../components/Header/Header";

type ProtectedRouteProps = OutletProps & {
  redirectPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/",
  ...rest
}: ProtectedRouteProps) => {
  const { user } = useAuthUser();

  if (user === undefined) return null;

  if (user) {
    return (
      <>
        <Header />
        <Outlet {...rest} />
      </>
    );
  }

  return <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
