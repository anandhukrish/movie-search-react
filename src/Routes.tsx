import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
