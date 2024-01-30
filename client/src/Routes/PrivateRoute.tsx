import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Spinner from "../Components/Spinner/Spinner";

export interface PrivateRouteProps {
  component: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (
  props: PrivateRouteProps
) => {
  const { isSignedIn, pending, user } = useAuth();
  const auth = useAuth();

  return pending ? (
    <Spinner />
  ) : isSignedIn ? (
    props.component
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
};

export default PrivateRoute;
