import { useEffect, useState } from "react";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");

export default function Registro() {
  const [global, setGlobal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registroSelecionado, setRegistroSelecionado] = useState("Atalhos");
  const [tipoDeRegistro, setTipoDeRegistro] = useState("");
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [pastaSelecionada, setPastaSelecionada] = useState("Atalhos");
  const [pastasExistentes, setPastasExistentes] = useState([]);

  function buscarAtualizacao() {
    ipcRenderer.send("atualizar global", "pegar");
    ipcRenderer.on("global atualizado", (event, data) => {
      setGlobal(data);
      setIsLoading(false);
    });
  }

  function atualizarGlobal(dados) {
    ipcRenderer.send("atualizar global", {
      global: dados,
      atualizar: "atualizar",
    });
    ipcRenderer.on("global atualizado", (event, data) => {});
  }

  useEffect(() => {
    buscarAtualizacao();
    let ar = [];
    function teste(f, pai) {
      for (let item in f) {
        if (f[item].tipo === "pasta") {
          pai !== ""
            ? //  ? ar.push(pai + " - " + f[item].nome)
              ar.push(f[item].nome)
            : ar.push(f[item].nome);
        }

        if (f[item].filhos) {
          teste(f[item].filhos, f[item].nome);
        } else {
          continue;
        }
      }
    }
    setPastasExistentes(ar);

    console.log(global);
    teste(global?.atalhos, " ");
    return () => {
      ipcRenderer.removeAllListeners("global atualizado");
    };
  }, [global, setGlobal]);

  function registrar(g, local, novo) {
    function mapRecursivo(a, b, c) {
      a.map((item, i) => {
        if (item.nome === b) {
          item.filhos.push(c);
        }
        if (item.tipo === "pasta") {
          mapRecursivo(item.filhos, b, c);
        }
      });
    }
    mapRecursivo(g, local, novo);
  }

  return (
    <div className="telasVariaveis">
      <div className="registro">
        {isLoading ? (
          <p>Carregando dados globais...</p>
        ) : (
          <>
            <h1>Registros</h1>
            <div className="divPaiBotoesRegistro">
              <div
                onClick={() => {
                  setRegistroSelecionado("Atalhos");
                }}
              >
                Atalhos
              </div>
              <div
                onClick={() => {
                  setRegistroSelecionado("Comandos");
                }}
              >
                Comandos
              </div>
            </div>
            {registroSelecionado === "Atalhos" ? (
              <>
                <h2>Adicionar</h2>
                <div className="divPaiBotoesRegistro">
                  <div
                    onClick={() => {
                      setTipoDeRegistro("Pasta");
                    }}
                  >
                    Pasta
                  </div>
                  <div
                    onClick={() => {
                      setTipoDeRegistro("Link");
                    }}
                  >
                    Link
                  </div>
                </div>
              </>
            ) : null}
            {/* ... restante do seu componente */}
          </>
        )}
      </div>
    </div>
  );
}
