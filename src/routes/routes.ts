import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
])

export default routes;