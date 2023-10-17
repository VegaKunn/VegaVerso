// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

/* 
import { useState } from "react";
import global from "../../global.mjs";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");
export default function Atalhos() {
  const [arrPaieFilho, setArrPaieFilho] = useState(global.atalhos);

 

  function excluirObjetoPorNome(objetos, nomeParaExcluir) {
    for (let i = objetos.length - 1; i >= 0; i--) {
      const objeto = objetos[i];

      if (objeto.nome === nomeParaExcluir) {
        objetos.splice(i, 1);
      }

      if (objeto.filhos && objeto.filhos.length > 0) {
        excluirObjetoPorNome(objeto.filhos, nomeParaExcluir);
      }
    }
  }

  function renderizarAbas(renderizarPasta) {
    return renderizarPasta.map((item, index) => (
      <div className="blocos1" key={index}>
        <div
          className="blocoTitulo"
          onClick={() => {
            if (item.tipo === "pasta") {
              setArrPaieFilho(item.filhos);
            }
            if (item.tipo === "link") {
              ipcRenderer.send("navegar", item.link);
            }
          }}
        >
          <p>{item.nome}</p>
        </div>
        <div className="blocoConfig">
          <div>{"<3"}</div>
          <div
            onClick={() => {
              excluirObjetoPorNome(global.atalhos, item.nome);
            }}
          >
            X
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="telasVariaveis">
      <div>
        <h2>Retornar</h2>
      </div>
      <div className="allAtalhos">{renderizarAbas(arrPaieFilho)}</div>
    </div>
  );
}



import { useState } from "react";
import global from "../../global.mjs";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");

export default function Atalhos() {
  const [arrPaieFilho, setArrPaieFilho] = useState(global.atalhos);

  function excluirObjetoPorNome(objetos, nomeParaExcluir) {
    for (let i = objetos.length - 1; i >= 0; i--) {
      const objeto = objetos[i];

      if (objeto.nome === nomeParaExcluir) {
        objetos.splice(i, 1);
      }

      if (objeto.filhos && objeto.filhos.length > 0) {
        excluirObjetoPorNome(objeto.filhos, nomeParaExcluir);
      }
    }
  }

  function handleExcluirItem(item) {
    excluirObjetoPorNome(global.atalhos, item.nome);
    // Atualize o estado após a exclusão.
    setArrPaieFilho([...arrPaieFilho]); // Isso forçará a renderização.
  }

  function renderizarAbas(renderizarPasta) {
    return renderizarPasta.map((item, index) => (
      <div className="blocos1" key={index}>
        <div
          className="blocoTitulo"
          onClick={() => {
            if (item.tipo === "pasta") {
              setArrPaieFilho(item.filhos);
            }
            if (item.tipo === "link") {
              ipcRenderer.send("navegar", item.link);
            }
          }}
        >
          <p>{item.nome}</p>
        </div>
        <div className="blocoConfig">
          <div>{"<3"}</div>
          <div onClick={() => handleExcluirItem(item)}>X</div>
        </div>
      </div>
    ));
  }

  return (
    <div className="telasVariaveis">
      <div>
        <h2>Retornar</h2>
      </div>
      <div className="allAtalhos">{renderizarAbas(arrPaieFilho)}</div>
    </div>
  );
}
*/
