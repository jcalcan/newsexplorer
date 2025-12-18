import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../contexts/Appcontexts";
import "./ProtectedRoute.css";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn, isLoading } = useContext(AppContext);
  console.log(
    "ProtectedRoute isLoggedIn:",
    isLoggedIn,
    "path:",
    location.pathname
  );

  if (isLoading) {
    return <div>Loading...</div>; // Or spinner
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
