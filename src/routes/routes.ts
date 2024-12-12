import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Home/Home";
import { CharacterSelectionPage } from "./CharacterSelectionPage";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: CharacterSelectionPage,
  },
])

export default routes;