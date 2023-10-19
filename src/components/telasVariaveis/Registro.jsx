import { useEffect, useState } from "react";
import "./telasVariaveisCss.css";
const { ipcRenderer } = window.require("electron");
let global;
export default function Registro() {
  // const [global, setGlobal] = useState([]);

  const [ultimaRender, setUltimaRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registroSelecionado, setRegistroSelecionado] = useState("Atalhos");
  const [tipoDeGegistro, setTipoDeRegistro] = useState("");
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [pastaSelecionada, setPastaSelecionada] = useState("Atalhos");
  const [pastasExistentes, setPastasExistentes] = useState([]);

  function buscarAtualizacao() {
    ipcRenderer.send("atualizar global", "pegar");
    ipcRenderer.on("global atualizado", (event, data) => {
      global = data;
      setIsLoading(false);
      setUltimaRender(true);
      // Atualize o estado quando a resposta chegar.
    });
  }

  function atualizarGlobal(dados) {
    ipcRenderer.send("atualizar global", {
      global: dados,
      atualizar: "atualizar",
    });
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
    global && console.log(global?.atalhos);
    console.log(global);
    teste(global?.atalhos, " ");
    return () => {
      // Remova o ouvinte quando o componente for desmontado para evitar vazamentos de memória.
      ipcRenderer.removeAllListeners("global atualizado");
    };
  }, [ultimaRender, setUltimaRender]); // aqui

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
  // registrar(global?.atalhos, "css", { nome: "batata" });

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
          </>
        )}
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
                  setPastaSelecionada(pastasExistentes[0]);
                }}
              >
                Link
              </div>
            </div>
          </>
        ) : null}
        {tipoDeGegistro === "Pasta" && registroSelecionado === "Atalhos" ? (
          <>
            <label htmlFor="nome">Nome Da Pasta:</label>
            <input
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            <label>Dentro De:</label>
            <select
              name="allPastas"
              id="allPastas"
              value={pastaSelecionada}
              onChange={(e) => {
                setPastaSelecionada(e.target.value);
              }}
            >
              <option value="Atalhos">Atalhos</option>
              {pastasExistentes.map((item, i) => {
                return <option value={pastasExistentes[i]}>{item}</option>;
              })}
            </select>
            <div
              className="registrarBtn"
              onClick={() => {
                if (pastaSelecionada === "Atalhos") {
                  global?.atalhos.push({
                    nome: nome,
                    tipo: "pasta",
                    filhos: [],
                  });
                }
                registrar(global?.atalhos, pastaSelecionada, {
                  nome: nome,
                  tipo: "pasta",
                  filhos: [],
                });

                setNome("");

                atualizarGlobal(global);
              }}
            >
              Registrar Atalho
            </div>
          </>
        ) : null}
        {tipoDeGegistro === "Link" ? (
          <>
            <label htmlFor="nome">Digite o nome do link:</label>
            <input
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            <label htmlFor="link">Digite o link:</label>
            <input
              name="link"
              type="text"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <label>Dentro De:</label>
            <select
              name="allPastas"
              id="allPastas"
              value={pastaSelecionada}
              onChange={(e) => {
                setPastaSelecionada(e.target.value);
              }}
            >
              {pastasExistentes.map((item, i) => {
                return <option value={pastasExistentes[i]}>{item}</option>;
              })}
            </select>
            <div
              className="registrarBtn"
              onClick={() => {
                registrar(global?.atalhos, pastaSelecionada, {
                  nome: nome,
                  tipo: "link",
                  link: link,
                });

                setNome("");
                setLink("");
                console.log("estou no link");
                atualizarGlobal(global);
              }}
            >
              Registrar Atalho
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
