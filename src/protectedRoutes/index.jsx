import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const ProtectedRoutes = () => {
  // const { user } = useUserAuth();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <div> ....Loading</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoutes;
