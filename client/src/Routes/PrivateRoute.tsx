import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export interface PrivateRouteProps {
  component: JSX.Element
}

const PrivateRoute : React.FC<PrivateRouteProps> = (props : PrivateRouteProps) => {
  const {isSignedIn, pending, user} = useAuth()
  const auth = useAuth()

  return pending ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  : (isSignedIn ?
    props.component :
    <Navigate to={{ pathname: '/login'}} />)
}

export default PrivateRoute