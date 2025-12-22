Resumo do Tech Challenge - Fase 03 (Full Stack Development)

Este documento resume as diretrizes e requisitos para o desenvolvimento do front-end da aplicação de blogging, integrando-se ao back-end em Node.js e OutSystems previamente desenvolvidos.



🎯 Objetivo

Desenvolver uma interface gráfica robusta, intuitiva e eficiente utilizando React. A aplicação deve ser responsiva e acessível, permitindo a interação de docentes e alunos com endpoints REST.



🛠️ Requisitos Funcionais

A interface deve conter as seguintes páginas e funcionalidades:





Página Principal (Lista de posts): Exibição de todos os posts com título, autor e breve descrição, incluindo campo de busca por palavras-chave.





Página de Leitura: Conteúdo completo do post selecionado e opção de comentários (opcional).





Página de Criação: Formulário exclusivo para docentes com campos para título, conteúdo e autor.





Página de Edição: Carregamento de dados existentes e salvamento de alterações para professores.





Página Administrativa: Lista geral de postagens com botões de ação para editar e excluir.





Autenticação: Sistema de login para professores, garantindo que apenas usuários autenticados acessem as áreas de criação, edição e administração.



💻 Requisitos Técnicos



Framework: React com hooks e componentes funcionais.





Estilização: Styled Components (ou similar), garantindo responsividade para mobile e desktop.





Gerenciamento de Estado: Context API ou Redux (opcional).





Integração: Chamadas aos endpoints REST para operações de CRUD.





Infraestrutura: Uso de Dockerfiles e scripts de CI/CD.



📤 Entrega e Avaliação

Este projeto é obrigatório e representa 90% da nota final das disciplinas desta fase. Os itens de entrega incluem:





Código-fonte: Repositório no GitHub.





Apresentação: Vídeo demonstrando o funcionamento e detalhes técnicos.





Documentação: Arquivo README detalhado (setup, arquitetura e guia de uso) e relatório de experiências/desafios da equipe.



## Endpoints da API



| Método | Endpoint | Descrição |

|--------|----------|-----------|

| GET | `/posts` | Lista todos os posts |

| GET | `/posts/:id` | Busca post específico |

| POST | `/posts` | Cria novo post |

| PUT | `/posts/:id` | Atualiza post existente |

| DELETE | `/posts/:id` | Exclui post (soft delete) |

| GET | `/posts/search?q=termo` | Busca posts por palavra-chave |



\*\*Para detalhes completos, exemplos e testes:\*\* Acesse http://localhost:3000/swagger





