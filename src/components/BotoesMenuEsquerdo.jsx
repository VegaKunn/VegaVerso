import "./cssComponents/botoesMenuEsquerdo.css";

export default function BotoesMenuEsquerdo(props) {
  let nome = props.nome;
  let selecionar = props.selecionar;

  return (
    <div
      className="botoesMenuEsquerdo"
      onClick={() => {
        selecionar(nome);
      }}
    >
      <p>{nome}</p>
    </div>
  );
}
