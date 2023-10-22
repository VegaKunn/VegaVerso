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
  const [atalhoA, setAtalhoA] = useState("");
  const [atalhoB, setAtalhoB] = useState("");
  const [caminhoAtalho, setCaminhoAtalho] = useState("");
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
      <div className="registro ">
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
        ) : (
          <>
            <h2>Adicionar</h2>
            <label htmlFor="">Escolha um comando:</label> <br />
            <select
              value={atalhoA}
              onChange={(e) => {
                setAtalhoA(e.target.value);
              }}
            >
              <option value=""></option>
              {/*<option value="Super">Windows</option>*/}
              <option value="Ctrl">Ctrl</option>
              <option value="Alt">Alt</option>
              <option value="CmdOrCtrl">Ctrl+ALT</option>
            </select>
            <label htmlFor="">Escolha um comando:</label> <br />
            <select
              name="atalhoB"
              value={atalhoB}
              onChange={(e) => {
                setAtalhoB(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
              <option value="e">e</option>
              <option value="f">f</option>
              <option value="g">g</option>
              <option value="h">g</option>
              <option value="i">i</option>
              <option value="j">j</option>
              <option value="k">k</option>
              <option value="l">l</option>
              <option value="m">m</option>
              <option value="n">n</option>
              <option value="o">o</option>
              <option value="p">p</option>
              <option value="q">q</option>
              <option value="r">r</option>
              <option value="s">s</option>
              <option value="t">t</option>
              <option value="u">u</option>
              <option value="v">v</option>
              <option value="w">w</option>
              <option value="x">x</option>
              <option value="y">y</option>
              <option value="z">z</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="Num0">numerico 0</option>
              <option value="Num1">numerico 1</option>
              <option value="Num2">numerico 2</option>
              <option value="Num3">numerico 3</option>
              <option value="Num4">numerico 4</option>
              <option value="Num5">numerico 5</option>
              <option value="Num6">numerico 6</option>
              <option value="Num7">numerico 7</option>
              <option value="Num8">numerico 8</option>
              <option value="Num9">numerico 9</option>
              <option value="Up">Cima</option>
              <option value="Down">Direita</option>
              <option value="Left">Baixo</option>
              <option value="Right">Esquerda</option>
            </select>
            <label htmlFor="">
              Cole o caminho exato do arquivo ou pasta que deseja acessar
            </label>
            <input
              type="text"
              value={caminhoAtalho}
              onChange={(e) => {
                setCaminhoAtalho(e.target.value);
              }}
            />
            <div
              className="registrarBtn"
              onClick={() => {
                let comando = atalhoA + "+" + atalhoB;

                const novoAtalho = {
                  comando,
                  caminho: caminhoAtalho,
                };
                if (novoAtalho.comando !== "" && novoAtalho.caminho !== "") {
                  global.comandos.push(novoAtalho);
                }

                console.log(global);
                // atualizarGlobal(global);
                setAtalhoA("");
                setAtalhoB("");
                setCaminhoAtalho("");
              }}
            >
              Registrar Atalho
            </div>
          </>
        )}
        {tipoDeGegistro === "Pasta" && registroSelecionado === "Atalhos" ? (
          <>
            <label htmlFor="nome">Nome Da Pasta:</label>
            <input
              name="nome"
              type="text"
              className=" shadow-xl m-2 border-1 ring-black ring-1"
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
        {tipoDeGegistro === "Link" && registroSelecionado === "Atalhos" ? (
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
