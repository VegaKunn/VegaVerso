import "./telasVariaveisCss.css";
import global from "../../global.mjs";
import a from "../../testarExportacao.mjs";
import { useState, useEffect } from "react";
const { ipcRenderer } = window.require("electron");

export default function Ferramentas() {
  const [arrPaieFilho, setArrPaieFilho] = useState(null);
  function buscarAtualizacao() {
    ipcRenderer.send("atualizar global", "pegar");
    ipcRenderer.on("global atualizado", (event, data) => {
      setArrPaieFilho(data); // Atualize o estado quando a resposta chegar.
    });
  }
  useEffect(() => {
    buscarAtualizacao(); // Chame a função de busca quando o componente for montado.

    return () => {
      // ipcRenderer.removeAllListeners("global atualizado");
      // Remova o ouvinte quando o componente for desmontado para evitar vazamentos de memória.
      //  ipcRenderer.removeAllListeners("global atualizado");
    };
  }, []);
  return (
    <div className="telasVariaveis">
      <div>Ferramentas</div>
    </div>
  );
}
