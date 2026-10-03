import { useState } from "react";

function Counter() {
    const [contador, setContador] = useState(0);
    const [passo, setPasso] = useState(1);

    function aumentar() {
        setContador(contador + passo);
    }

    function diminuir() {
        setContador(contador - passo);
    }

    function resetar() {
        setContador(0);
    }

    return (
        <div className="counter">
            <h2>Contador</h2>

            <p>Valor: {contador}</p>

            <label>
                Passo:
                <input
                    type="number"
                    value={passo}
                    onChange={(event) =>
                        setPasso(Number(event.target.value))
                    }
                />
            </label>

            <div>
                <button onClick={diminuir}>−</button>
                <button onClick={aumentar}>+</button>
                <button onClick={resetar}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;