import { useEffect, useState } from "react";

interface Usuario {
    id: number;
    name: string;
    email: string;
}

function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar usuários.");
                }

                return resposta.json();
            })
            .then((dados: Usuario[]) => {
                setUsuarios(dados);
            })
            .catch(() => {
                setErro("Não foi possível carregar os usuários.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    if (carregando) {
        return <p>Carregando...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <div>
            <h2>Lista de Usuários</h2>

            {usuarios.map((usuario) => (
                <div key={usuario.id}>
                    <h3>{usuario.name}</h3>
                    <p>{usuario.email}</p>
                </div>
            ))}
        </div>
    );
}

export default Usuarios;