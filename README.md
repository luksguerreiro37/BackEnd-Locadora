# BackEnd-Locadora
Essa API tem o intuito de gerenciar a coleção de filmes disponíveis em uma plataforma de streaming

 objetivo é elaborar um microsserviço que será utilizado em uma plataforma de streaming. Essa API terá o intuito de gerenciar a coleção de filmes disponíveis.
## Tabela
| Coluna       | Especificações                               |
| ------------ | -------------------------------------------- |
| **id**       | inteiro, auto incrementado e chave primária. |
| **name**     | string tamanho 50 e não nulo.                |
| **category** | string tamanho 20 e não nulo.                |
| **duration** | inteiro e não nulo.                          |
| **price**    | inteiro e não nulo.                          |

#
## Endpoints da aplicação

| Método | Endpoint    | Responsabilidade       |
| ------ | ----------- | ---------------------- |
| POST   | /movies     | Criar os filmes        |
| GET    | /movies     | Listar todos os filmes |
| GET    | /movies/:id | Buscar filme por id    |
| PATCH  | /movies/:id | Atualizar filme por id |
| DELETE | /movies/:id | Deletar filme por id   |

#