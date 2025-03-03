# Sistema de Acompanhamento de Matrículas

Este projeto é uma solução full-stack para o gerenciamento de cursos, alunos e matrículas, desenvolvida com as melhores práticas e tecnologias modernas.

## Tecnologias Utilizadas

### Back-end
- **C# / .NET Core**: Aplicação de API RESTful
- **Entity Framework Core**: Persistência de dados com Migrations
- **SQL Server**: Banco de dados relacional
- **Swagger**: Documentação interativa da API

### Front-end
- **React.js** com **TypeScript**
- **CSS** para estilização

## Funcionalidades

- **Gerenciamento de Cursos**: Criar, listar, editar e excluir cursos (nome e descrição).
- **Gerenciamento de Alunos**: Criar, listar, editar e excluir alunos (nome, e-mail, data de nascimento). Validação para impedir cadastro de alunos menores de idade.
- **Gerenciamento de Matrículas**: Matrícula de alunos em cursos, remoção de alunos de cursos.
- **Listagem e Filtros**: Listagem de cursos disponíveis, alunos matriculados e filtragem de alunos por curso.

## Estrutura do Projeto

O repositório é organizado em dois diretórios principais:
- **/back-end**: Contém a API desenvolvida em .NET Core.
- **/front-end**: Contém a aplicação React desenvolvida com TypeScript.

## Instruções para Rodar o Projeto Localmente

### Pré-requisitos

- **Para o Back-end:**
  - [.NET 8 SDK](https://dotnet.microsoft.com/download)
  - [SQL Server](https://www.microsoft.com/pt-br/sql-server) (ou SQL Server Express)
  - Ferramenta de linha de comando (Terminal/PowerShell)

- **Para o Front-end:**
  - [Node.js](https://nodejs.org/) (versão 14 ou superior)
  - Gerenciador de pacotes (npm ou yarn)

### Configuração do Back-end

1. **Clonar o repositório:**

   ```bash
   git clone <URL-do-seu-repositório>
   cd <nome-do-repositório>/back-end
   
## Configuração do Banco de Dados

No arquivo `appsettings.json` (localizado na pasta do back-end), altere a string de conexão para apontar para o seu SQL Server:

    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=SEU_SERVIDOR;Database=NomeDoBanco;User Id=SeuUsuario;Password=SuaSenha;"
      },
     
    }

## Aplicar as Migrations e Atualizar o Banco de Dados

Dentro da pasta do back-end, abra o terminal e execute o seguinte comando para aplicar as migrations e atualizar seu banco de dados:

    ```bash
    dotnet ef database update

Rodar a API

Ainda na pasta do back-end, execute:

    ``` bash
    dotnet run
    
Configuração do Front-end

Clonar o repositório (caso ainda não tenha feito):

     ``` bash
    git clone <URL-do-seu-repositório>
    cd <nome-do-repositório>/front-end
    Instalar as dependências

No diretório do front-end, execute:

    ``` bash
    npm install
    # ou
    yarn install
    
Rodar a aplicação React

Inicie o servidor de desenvolvimento com:

     ``` bash
    
    npm run dev
    # ou
    yarn dev
    
## Deploy

O front-end está publicado em: [Clique aqui para acessar](https://main.d2bi4mvtur1il9.amplifyapp.com)

