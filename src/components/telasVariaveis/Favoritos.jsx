import { useState, useEffect } from "react";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");

export default function Favoritos() {
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
      // Remova o ouvinte quando o componente for desmontado para evitar vazamentos de memória.
      //  ipcRenderer.removeAllListeners("global atualizado");
    };
  }, []); // O array vazio garante que o useEffect seja executado apenas uma vez na montagem.

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
    if (arrPaieFilho) {
      const novoArrPaieFilho = [...arrPaieFilho];
      excluirObjetoPorNome(novoArrPaieFilho, item.nome);
      setArrPaieFilho(novoArrPaieFilho);
    }
  }

  function renderizarAbas(renderizarPasta) {
    // Verifique se renderizarPasta é um array antes de mapeá-lo

    if (Array.isArray(renderizarPasta.Favoritos)) {
      return renderizarPasta.Favoritos.map((item, index) => (
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
            <div onClick={() => handleExcluirItem(item)}>X</div>
          </div>
        </div>
      ));
    } else {
      // Renderize algo apropriado quando renderizarPasta não for um array
      return <div>Nenhum item para renderizar.</div>;
    }
  }

  return (
    <div className="telasVariaveis">
      <div>
        <h2>Retornar</h2>
      </div>
      <div className="allAtalhos">{renderizarAbas(arrPaieFilho || [])}</div>
    </div>
  );
}
