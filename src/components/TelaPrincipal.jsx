import "./cssComponents/telaPrincipal.css";
import Atalhos from "./telasVariaveis/Atalhos";
import Favoritos from "./telasVariaveis/Favoritos";
import Ferramentas from "./telasVariaveis/Ferramentas";
import Registro from "./telasVariaveis/Registro";
import Navegar from "./telasVariaveis/Navegar";

export default function TelaPrincipal(props) {
  let load = props.load;
  return (
    <div className="telaPrincipal">
      {load === "Atalhos" ? <Atalhos /> : null}
      {load === "Favoritos" ? <Favoritos /> : null}
      {load === "Ferramentas" ? <Ferramentas /> : null}
      {load === "Registro" ? <Registro /> : null}
      {load === "Navegar" ? <Navegar /> : null}
    </div>
  );
}
