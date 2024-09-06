import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Entity } from "./types/gen/Entity";

let entity : Entity = {
  Name: "This is a Test",
  Damage: "D8",
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
