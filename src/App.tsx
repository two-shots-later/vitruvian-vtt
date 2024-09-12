import { useState } from "react";
import * as ReactDOM from "react-dom/client";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Entity } from "./types/gen/Entity";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    let data = await invoke("get_test_data");
    console.log(data);
    // setGreetMsg(await invoke("get_test_data"));
  }
  
  /// The following code is to make an entity and send it to the backend
  const entity : Entity = {
    Name: "Test",
    Damage : "D12"
  }
  
  function send_value() {
    invoke("set_test_data", {data : entity});
  }

  return (
    <div className="container">
      <h1>Home Page</h1>
    </div>
  );
}

export default App;
