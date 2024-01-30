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
      {
        path: "",
        element: <PrivateRoute component={<HomePage />} />,
        children: [
          { path: "", element: <div>Warehouses</div> },
          { path: "users", element: <div>Users</div> },
          { path: "admin", element: <div>Admin</div> },
          { path: "logs", element: <div>Logs</div> },
        ],
      },
    ],
  },
]);

export default router;
