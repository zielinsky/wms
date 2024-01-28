import React, { useState } from 'react';
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


interface IAuthContext {
  isLoggedIn : boolean
  login : (email: string, password: string) => void
  logout : () => void
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

interface AuthProviderProps extends React.PropsWithChildren {}

export const AuthProvider = (props: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then(
      (_) => {
        setIsLoggedIn(true);
        navigate("/");
      },
      (reason) => console.log(reason)
    );
  }

  const logout = () => {
    signOut(auth).then(() => setIsLoggedIn(false))
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};