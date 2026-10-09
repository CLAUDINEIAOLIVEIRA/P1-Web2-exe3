# Exercício 3: React, hooks e estado (useState e useEffect)

## Parte 1: Criando o projeto React

**Passo 1. Abra o terminal** na pasta `Exercicio 3` (menu **Terminal > Novo Terminal** ou `Ctrl + '`).

**Passo 2. Crie o projeto com o Vite.**

```
npm create vite@latest hooks-react -- --template react
```

Se o terminal fizer perguntas, escolha **React** e depois **JavaScript**.

**Passo 3. Entre na pasta, instale as dependências e abra no VS Code.**

```
cd hooks-react
npm install
code .
```

**Passo 4. Limpe os arquivos de exemplo.**

- Apague o arquivo `src/App.css`.
- Apague a pasta `src/assets`.
- Apague todo o conteúdo de `src/index.css` (vamos escrever o nosso no Passo 8).

> **O que é um hook?** É uma função especial do React que começa com `use`. Os dois que vamos usar:
>
> - `useState`: guarda um valor que pode mudar. Quando ele muda, o React atualiza a tela sozinho.
> - `useEffect`: executa um código "por fora" da tela, como buscar dados na internet.

## Parte 2: Exercício 3.1, o contador com passo

**Passo 5. Crie a pasta `src/components`** e, dentro dela, o arquivo `Contador.jsx`:

```jsx
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
```

> **Como funciona o `useState`?** A linha `const [contador, setContador] = useState(0);` cria duas coisas:
>
> - `contador`: o valor atual (começa em `0`);
> - `setContador`: a função que troca o valor. **Nunca** altere `contador` direto (`contador = 5` não funciona); sempre use o `set`.

> **Por que `Number(e.target.value)`?** Tudo o que vem de um `<select>` ou `<input>` chega como **texto**. Sem o `Number()`, a conta `0 + "5"` daria `"05"` em vez de `5`.

> **Por que `{' '}`?** No JSX, o espaço no fim da linha é descartado. O `{' '}` garante um espaço entre "Passo:" e o select.

## Parte 3: Exercício 3.2, buscando usuários na API

**Passo 6. Crie o arquivo `src/components/ListaUsuarios.jsx`:**

```jsx
import { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // O array vazio [] faz o useEffect rodar só uma vez, quando o componente aparece na tela
  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os usuários.');
        }

        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        setError(erro.message);
      } finally {
        setLoading(false);
      }
    }

    buscarUsuarios();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="erro">Erro: {error}</p>;
  }

  return (
    <section className="bloco">
      <h2>Usuários</h2>
      <ul className="usuarios">
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.name}</strong>
            <span>{usuario.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ListaUsuarios;
```

> **Os três estados.**
>
> | Estado | Começa com | Para que serve |
> |---|---|---|
> | `usuarios` | `[]` (lista vazia) | Guardar os usuários que vieram da API |
> | `loading` | `true` | Saber se ainda está carregando |
> | `error` | `null` (nenhum erro) | Guardar a mensagem se algo der errado |

> **Por que o `[]` no final do `useEffect`?** É o array de dependências. Vazio, ele diz ao React: "rode este código **uma vez só**, quando o componente aparecer". Sem ele, o fetch rodaria a cada atualização da tela, sem parar.

> **O que fazem `try`, `catch` e `finally`?**
>
> - `try`: tenta buscar os dados;
> - `catch`: se der erro (sem internet, endereço errado), guarda a mensagem em `error`;
> - `finally`: roda sempre, dando certo ou errado, e desliga o `loading`.

> **Por que `key={usuario.id}`?** Sempre que usamos `.map()` para gerar uma lista, o React precisa de uma `key` única em cada item para saber qual é qual.

## Parte 4: Juntando tudo no App

**Passo 7. Substitua todo o conteúdo de `src/App.jsx`:**

```jsx
import Contador from './components/Contador.jsx';
import ListaUsuarios from './components/ListaUsuarios.jsx';

function App() {
  return (
    <main>
      <h1>Hooks no React</h1>
      <Contador />
      <ListaUsuarios />
    </main>
  );
}

export default App;
```

**Passo 8. Escreva os estilos em `src/index.css`:**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f2f4f7;
  color: #222;
}

main {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px;
}

.bloco {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
}

.bloco h2 {
  margin-top: 0;
}

/* Contador (Exercício 3.1) */
.valor {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 8px 0 16px;
}

select {
  font-size: 16px;
  padding: 4px 8px;
}

.botoes {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.botoes button {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #4a6cf7;
  color: #fff;
  cursor: pointer;
}

.botoes button:hover {
  background-color: #3451c9;
}

/* Lista de usuários (Exercício 3.2) */
.usuarios {
  list-style: none;
  padding: 0;
  margin: 0;
}

.usuarios li {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.usuarios span {
  color: #555;
  font-size: 14px;
}

.erro {
  color: #c62828;
}
```

**Passo 9. Rode e confira no navegador.**

```
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

| O que testar | Resultado esperado |
|---|---|
| Clicar em **+** com passo 1 | O número sobe de 1 em 1 |
| Trocar o passo para 5 e clicar em **+** | O número sobe de 5 em 5 |
| Clicar em **-** | O número desce pelo valor do passo (pode ficar negativo) |
| Clicar em **Resetar** | O número volta para 0 |
| Abrir a página | "Carregando..." aparece rápido e some |
| Depois de carregar | Lista com 10 usuários, cada um com nome e e-mail |

> **Dica para ver o "Carregando..." com calma:** aperte `F12`, vá na aba **Network (Rede)**, troque "No throttling" por **Slow 3G** e recarregue a página. Para testar a mensagem de erro, marque **Offline** no mesmo lugar e recarregue.

## Problemas comuns

- **O contador mostra `05`, `055`...**: faltou o `Number()` no `onChange` do select.
- **O fetch fica rodando sem parar**: faltou o `[]` no final do `useEffect`.
- **Aviso no console `Each child in a list should have a unique "key" prop`**: faltou `key={usuario.id}` no `<li>`.
- **Erro `useState is not defined`**: faltou o `import { useState } from 'react';` no topo do arquivo.
- **Erro dizendo que a execução de scripts foi desabilitada, ao rodar `npm`**: troque o terminal para o **Prompt de Comando (cmd)**, pela setinha ao lado do `+` no terminal do VS Code.

## Entrega

Não coloque a pasta `node_modules` no .zip. Ela é grande e pode ser recriada com `npm install`.
