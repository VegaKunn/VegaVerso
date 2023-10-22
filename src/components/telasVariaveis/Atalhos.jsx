import { useState, useEffect } from "react";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");

export default function Atalhos() {
  const [global, setGlobal] = useState();
  const [arrPaieFilho, setArrPaieFilho] = useState(null);
  function buscarAtualizacao() {
    ipcRenderer.send("atualizar global", "pegar");
    ipcRenderer.on("global atualizado", (event, data) => {
      setGlobal(data);
      setArrPaieFilho(data.atalhos); // Atualize o estado quando a resposta chegar.
    });
  }
  function atualizarGlobal(dados) {
    console.log(dados);
    ipcRenderer.send("atualizar global", {
      global: dados,
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
      ipcRenderer.removeAllListeners("global atualizado");
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
      excluirObjetoPorNome(global.atalhos, item.nome);
      atualizarGlobal(global);
      setArrPaieFilho(novoArrPaieFilho);
    }
  }

  function addFavoritos(item) {
    global.favoritos.push(item);
    atualizarGlobal(global);
  }

  function renderizarAbas(renderizarPasta) {
    return renderizarPasta.map((item, index) => (
      <div
        className="flex flex-col rounded-3xl  ring-2 ring-gray-50 p-0 aspect-square cursor-pointer hover:bg-violet-600 hover:shadow-violet-500  w-40 h-40 text-lg text-slate-100 text-opacity-90 font-bold justify-center bg-cyan-500 shadow-xl shadow-cyan-500/80 "
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
        <div className="flex justify-around  w-full border-t-2">
          <div
            className="w-1/2 hover:text-red-500"
            onClick={() => addFavoritos(item)}
          >
            {"<3"}
          </div>
          <div
            className="w-1/2 hover:text-red-500"
            onClick={() => handleExcluirItem(item)}
          >
            X
          </div>
        </div>
      </div>
    ));
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
//blocos1

/*

bg-cyan-700

bg-orange-200
bg-amber-900
bg-orange-950


bg-green-950
bg-teal-700
bg-emerald-200

*/
