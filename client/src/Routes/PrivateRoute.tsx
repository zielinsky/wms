import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"

export interface PrivateRouteProps {
  component: JSX.Element
}

const PrivateRoute : React.FC<PrivateRouteProps> = (props : PrivateRouteProps) => {

  const auth = useAuth()

  return auth.isLoggedIn ?
    props.component :
    <Navigate to={{ pathname: '/login'}} />
}

export default PrivateRoute