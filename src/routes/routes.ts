import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Home/Home";
import ComponentLibrary from "./ComponentLibrary/ComponentLibrary";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home
  },
  {
    path: "/component-lib",
    Component: ComponentLibrary
  }
])

export default routes;