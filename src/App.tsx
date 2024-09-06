import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Entity } from "./types/gen/Entity";

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
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <button type="submit">Get Entity</button>
        <button onClick={send_value}>Send Entity</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
