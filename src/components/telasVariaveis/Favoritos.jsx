import { useState, useEffect } from "react";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");

let global;

export default function Favoritos() {
  const [arrPaieFilho, setArrPaieFilho] = useState(null);
  function buscarAtualizacao() {
    ipcRenderer.send("atualizar global", "pegar");
    ipcRenderer.on("global atualizado", (event, data) => {
      global = data;
      console.log(global);
      setArrPaieFilho(data.favoritos); // Atualize o estado quando a resposta chegar.
    });
  }

  function atualizarGlobal(dados) {
    global.favoritos = dados;

    ipcRenderer.send("atualizar global", {
      global,
      atualizar: "atualizar",
    });
    ipcRenderer.on("global atualizado", (event, data) => {
      console.log("data");
      setArrPaieFilho(data.atalhos); // Atualize o estado quando a resposta chegar.
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
      atualizarGlobal(novoArrPaieFilho);
      setArrPaieFilho(novoArrPaieFilho);
    }
  }

  function renderizarAbas(renderizarPasta) {
    // Verifique se renderizarPasta é um array antes de mapeá-lo

    if (Array.isArray(renderizarPasta)) {
      console.log(renderizarPasta);
      return renderizarPasta.map((item, index) => (
        <div
          className="flex flex-col rounded-3xl  ring-2 ring-gray-50 p-0 aspect-square cursor-pointer hover:bg-cyan-400 hover:shadow-cyan-400  w-40 h-40 text-lg text-slate-100 text-opacity-90 font-bold justify-center bg-cyan-500 shadow-xl shadow-cyan-500/80 "
          key={index}
        >
          <div
            className="h-32  w-full flex justify-center items-center"
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
            <div
              className="w-full hover:text-red-500"
              onClick={() => handleExcluirItem(item)}
            >
              X
            </div>
          </div>
        </div>
      ));
    } else {
      // Renderize algo apropriado quando renderizarPasta não for um array
      return <div>Nenhum item para renderizar.</div>;
    }
  }

  return (
    <div className="h-full flex flex-col bg-zinc-100 ">
      <div>
        <h2>Retornar</h2>
      </div>
      <div className="allAtalhos">{renderizarAbas(arrPaieFilho || [])}</div>
    </div>
  );
}
