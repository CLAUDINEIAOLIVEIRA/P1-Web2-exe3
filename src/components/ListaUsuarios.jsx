// Exercício 3.2 - Busca de usuários na API com useEffect
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
