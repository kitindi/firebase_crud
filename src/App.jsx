import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthentiCationPage from "./pages/auth";
import Home from "./pages/home";
import UpdateCity from "./pages/update";
import Login from "./pages/login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./protectedRoutes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/edit/:id",
        element: <UpdateCity />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <AuthentiCationPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
