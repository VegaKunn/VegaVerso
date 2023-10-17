import MenuLateralEsquerdo from "./components/MenuLateralEsquerdo";
import TelaPrincipal from "./components/TelaPrincipal";
import "./App.css";
import { useState } from "react";

function App() {
  const [load, setLoad] = useState("favoritos");

  return (
    <div className="App">
      <MenuLateralEsquerdo setLoad={setLoad} />
      <TelaPrincipal load={load} />
    </div>
  );
}

export default App;
