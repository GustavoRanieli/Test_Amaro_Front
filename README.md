Documentação do Projeto Frontend - Teste Amaro
1. Introdução
Este documento fornece uma visão geral do projeto "Teste Amaro" desenvolvido para o frontend e orientações sobre como configurar e executar o projeto localmente.

2. Requisitos
Ambiente:
Node.js versão 14 ou superior.
Yarn.
React.
TypeScript.
Redux (para gerenciamento de estado).
Configuração do banco de dados MySQL conforme descrito anteriormente para o backend.
Dependências:
Instale as dependências do projeto usando o comando:
-yarn install


3. Estrutura do Projeto
O projeto é estruturado da seguinte forma:

/src/
│
├── components/     // Componentes reutilizáveis do projeto
├── pages/          // Páginas da aplicação
├── routes/         // Configuração das rotas da aplicação
├── slices/         // Slice do Redux (redutores e ações)
├── store/          // Configuração do Redux Store
│   └── index.ts    // Arquivo de configuração do Redux
│
├── App.tsx         // Arquivo principal da aplicação
├── App.css         // Estilos globais
├── main.tsx        // Ponto de entrada da aplicação
│
├── package.json    // Manifesto do projeto (dependências, scripts, etc.)
├── tsconfig.json   // Configuração do TypeScript
└── yarn.lock       // Arquivo de lock do Yarn


4. Configuração do Banco de Dados
Criação do usuário:

No backend, conforme documentado anteriormente, o banco de dados test_amaro é configurado. Após configurar o backend, inicie a aplicação frontend para criar o usuário automaticamente.
Variáveis de ambiente (.env):

Configure as variáveis de ambiente no backend e frontend para conectar ao banco de dados e outras configurações necessárias.
REACT_APP_API_URL=http://localhost:3000   # URL do backend


5. Inicialização do Projeto
Instalar dependências:

-yarn install
Rodar a aplicação:

Após instalar as dependências, inicie o servidor com:
-yarn dev
O projeto estará disponível em http://localhost:5173.

Observações:
Como o frontend foi desenvolvido no domingo, alguns aspectos como estilo, responsividade e outros detalhes não foram implementados.
A aplicação utiliza React, TypeScript e Redux para gerenciar o estado global da aplicação.
Em adição ao básico, a aplicação inclui a configuração de Redux para gerenciar estados e interações assíncronas com o backend.