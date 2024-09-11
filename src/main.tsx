import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import routes from "./routes/routes";
import { applyTheme, getCurrentTheme } from "./common/theme";import { Suspense } from "react";

const Root = () => {
  
  // Frontend init tasks
  getCurrentTheme().then(theme => applyTheme(theme));
  
  return (
    // <Suspense fallback={<div>Loading</div>}>
    // </Suspense>
    <RouterProvider router={routes}/>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Root />
);

