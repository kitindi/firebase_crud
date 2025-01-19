import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthentiCationPage from "./pages/auth";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthentiCationPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
