// Exercício 3.1 - Contador com dois estados: o valor e o passo
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);
  const [passo, setPasso] = useState(1);

  function incrementar() {
    setContador(contador + passo);
  }

  function decrementar() {
    setContador(contador - passo);
  }

  function resetar() {
    setContador(0);
  }

  return (
    <section className="bloco">
      <h2>Contador</h2>

      <p className="valor">{contador}</p>

      <label>
        Passo:{' '}
        {/* O valor do select vem como texto, por isso usamos Number() */}
        <select value={passo} onChange={(e) => setPasso(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </label>

      <div className="botoes">
        <button onClick={decrementar}>-</button>
        <button onClick={resetar}>Resetar</button>
        <button onClick={incrementar}>+</button>
      </div>
    </section>
  );
}

export default Contador;
