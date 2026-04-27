// useState serve pra controlar dados que mudam na tela
import { useState } from "react";

// botão que eu posso reutilizar
function Botao({ onClick, children }) {
  // quando clicar executa a função que eu passar
  return <button onClick={onClick}>{children}</button>;
}

function App() {
  // lista de postos (começa vazia)
  const [postos, setPostos] = useState([]);

  // valor que eu digito no input
  const [texto, setTexto] = useState("");

  // função pra adicionar um posto
  const adicionarPosto = () => {
    // não deixa adicionar vazio
    if (texto.trim() === "") return;

    // cria um novo posto
    const novoPosto = {
      id: Date.now(), // id único
      texto: texto,   // nome do posto
      feita: false,   // começa como não marcado
    };

    // adiciona no array sem mexer no original
    setPostos([...postos, novoPosto]);

    // limpa o input depois
    setTexto("");
  };

  // muda o status (checkbox)
  const togglePosto = (id) => {
    const novaLista = postos.map((posto) => {
      // se for o que eu cliquei, troca o valor
      if (posto.id === id) {
        return { ...posto, feita: !posto.feita };
      }
      return posto;
    });

    // atualiza a lista
    setPostos(novaLista);
  };

  // remove um posto
  const removerPosto = (id) => {
    // filtra e tira o que eu cliquei
    const novaLista = postos.filter((posto) => posto.id !== id);

    setPostos(novaLista);
  };

  return (
    <div className="container">
      <h1>⚡ Postos Elétricos</h1>

      {/* input + botão */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Nome do posto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)} // atualiza conforme digita
        />

        <Botao onClick={adicionarPosto}>Adicionar</Botao>
      </div>

      {/* lista de postos */}
      {postos.map((posto) => (
        <div key={posto.id} className="item">
          <input
            type="checkbox"
            checked={posto.feita}
            onChange={() => togglePosto(posto.id)}
          />

          {/* risca quando marca */}
          <span className={posto.feita ? "feito" : ""}>
            {posto.texto}
          </span>

          <Botao onClick={() => removerPosto(posto.id)}>
            Remover
          </Botao>
        </div>
      ))}
    </div>
  );
}

export default App;