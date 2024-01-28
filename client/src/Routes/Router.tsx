import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import HomePage from "../Pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "", element: <PrivateRoute component= {<HomePage />}/>}
    ],
  },
]);

export default router