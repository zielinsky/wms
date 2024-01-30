import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

export function useAuth() {
  const [authState, setAuthState] = useState<{
    isSignedIn: boolean;
    pending: boolean;
    user: User | null;
  }>({
    isSignedIn: false,
    pending: true,
    user: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setAuthState({ user, pending: false, isSignedIn: !!user });
    });
    return () => unregisterAuthObserver();
  }, []);

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then(
      (_) => {
        navigate("/");
      },
      (reason) => console.log(reason)
    );
  };

  const logout = () => {
    signOut(auth).then();
  };

  return { auth, ...authState, login, logout };
}
