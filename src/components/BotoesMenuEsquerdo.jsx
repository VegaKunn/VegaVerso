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

//   className="botoesMenuEsquerdo"       className="text-neutral-200 bg-slate-900 hover:bg-indigo-600 text-sm rounded-lg p-2 m-1 h-16 w-16  ring-2 ring-gray-900 justify-center items-center  flex "
