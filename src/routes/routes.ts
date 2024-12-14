import {
  createBrowserRouter,
} from "react-router-dom";
import { CharacterSelectionPage } from "./CharacterSelectionPage/CharacterSelectionPage";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: CharacterSelectionPage,
  },
])

export default routes;