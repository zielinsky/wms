import React from 'react';
import { Outlet } from "react-router";
import { AuthProvider } from './Contexts/AuthContext'

function App() {


  return (
    <AuthProvider>
      <Outlet/>
    </AuthProvider>
  );
}

export default App;
