import { useState } from "react";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");
export default function Atalhos() {
  const [url, setUrl] = useState("https://www.");

  function pesquisar() {
    const data = url;
    ipcRenderer.send("navegar", data);
  }

  return (
    <div className="telasVariaveis">
      <h1>Navegar</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <button
        onClick={() => {
          pesquisar();
        }}
      >
        navegar
      </button>
    </div>
  );
}
