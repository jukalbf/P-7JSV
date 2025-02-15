import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home", element: <Home />
      },
    ]
  },
  {
    path: "/",
    element: <Login /> 
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
