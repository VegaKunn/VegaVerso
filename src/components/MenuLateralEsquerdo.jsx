import "./cssComponents/menuLateralEsquerdo.css";
import Botoes from "./BotoesMenuEsquerdo.jsx";

export default function MenuLateralEsquerdo(props) {
  let setLoad = props.setLoad;

  return (
    <div className="menuLateralEsquerdo">
      <Botoes nome="Favoritos" selecionar={setLoad} />
      <Botoes nome="Atalhos" selecionar={setLoad} />
      <Botoes nome="Ferramentas" selecionar={setLoad} />
      <Botoes nome="Registro" selecionar={setLoad} />
      <Botoes nome="Navegar" selecionar={setLoad} />
    </div>
  );
}
