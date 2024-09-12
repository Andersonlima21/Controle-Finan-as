# Controle Financeiro

Esta aplicação é um sistema de controle financeiro simples, que permite ao usuário adicionar despesas em dois períodos distintos (Dia 15 e Dia 30) e monitorar o saldo restante com base nas despesas pagas ou não pagas.

## Funcionalidades

- Adicionar salários para os dias 15 e 30.
- Adicionar despesas para os dois períodos.
- Marcar despesas como pagas ou não pagas.
- Atualização automática do saldo ao marcar/desmarcar despesas.
- Salvar e carregar dados mensais.

## Tecnologias Utilizadas

- **Node.js**: Para servir a aplicação e lidar com o backend.
- **HTML/CSS/JavaScript**: Interface do usuário e lógica do frontend.

## Instalação

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- **Node.js** instalado na máquina. [Baixar aqui](https://nodejs.org/).

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/Andersonlima21/Controle-Finan-as.git

2. Navegue até o diretório do projeto:

cd Controle-Finan-as
Instale as dependências:

npm install
Inicie a aplicação:

node app.js
Abra seu navegador e acesse: http://localhost:3000

Como Usar
Adicionar Novo Mês: Insira o mês desejado no campo Adicionar Novo Mês e clique em Salvar Mês.
Carregar Mês: Para carregar os dados de um mês salvo anteriormente, insira o mês no campo Selecione o Mês e clique em Carregar Mês.
Salário e Despesas: Insira os valores de salário nos campos Salário Dia 15 e Salário Dia 30. Depois, adicione despesas nos respectivos campos de cada dia.
Saldo Atualizado: Conforme você marca ou desmarca as despesas, o saldo será automaticamente atualizado e exibido em verde (positivo) ou vermelho (negativo), conforme o valor final.
Salvar Dados: Os dados do mês podem ser salvos clicando em Salvar Mês. Isso garantirá que as informações inseridas sejam persistidas.
Estrutura do Projeto
public/index.html: Contém a interface do usuário.
app.js: Arquivo principal que inicia o servidor Node.js.
package.json: Gerencia as dependências do projeto.
.gitignore: Configurado para ignorar a pasta node_modules.

Autor
Desenvolvido por Anderson Lima.
