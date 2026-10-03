React: Hooks e Estado (useState e useEffect)

Exercício 3.1: Contador Dinâmico com Passos Crie um componente de contador que gerencie o estado local usando useState.
Mantenha dois estados: contador e passo (ex: incrementar de 1 em 1, de 5 em 5).
Inclua botões para: + (Incrementar), - (Decrementar) e Resetar.
Adicione um <select> ou <input> para alterar o valor do passo.

Exercício 3.2: Busca de Dados na API com useEffect
Crie um componente que busque uma lista de usuários na API pública JSONPlaceholder ([https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)).
Use useState para armazenar a lista de usuários, o estado de carregamento (loading) e eventuais erros (error).
Use useEffect com array de dependências vazio [] para disparar o fetch ao carregar o componente.
Renderize um texto de "Carregando..." enquanto os dados não chegam.
