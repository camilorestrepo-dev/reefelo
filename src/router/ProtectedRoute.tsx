import { Navigate, Outlet, OutletProps } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

type ProtectedRouteProps = OutletProps & {
  redirectPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/",
  ...rest
}: ProtectedRouteProps) => {
  const { user } = useAuthUser();

  if (user === undefined) return null;

  if (user) return <Outlet {...rest} />;

  return <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
