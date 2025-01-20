import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthentiCationPage from "./pages/auth";
import Home from "./pages/home";
import UpdateCity from "./pages/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthentiCationPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/edit/:id",
    element: <UpdateCity />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
