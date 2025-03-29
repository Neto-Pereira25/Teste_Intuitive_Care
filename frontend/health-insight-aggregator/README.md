# 📌Projeto: Sistema de Consulta ANS

Sistema web para consulta de operadoras de saúde registradas na Agência Nacional de Saúde Suplementar (ANS).

## 📖 Sobre o Projeto

Este projeto foi desenvolvido para facilitar a consulta de informações de operadoras de saúde registradas na ANS. O sistema permite a visualização de dados detalhados sobre cada operadora, com filtros por modalidade, estado, cidade e nome.

## 🎯 Funcionalidades

- **Listagem de Operadoras**: Visualização em formato de cartões com informações básicas.
- **Filtros Avançados**: Possibilidade de filtrar por modalidade, UF, cidade e termo de busca.
- **Detalhes da Operadora**: Visualização de informações detalhadas sobre cada operadora.
- **Paginação**: Navegação entre páginas de resultados.
- **Indicadores de Carregamento**: Feedback visual durante o carregamento de dados.

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- React Bootstrap
- React Router
- React Toastify
- React Query (TanStack Query)

## ▶️ Como Executar o Projeto

```sh
# Clone o repositório
git clone git@github.com:Neto-Pereira25/Teste_Intuitive_Care.git

# Entre no diretório do projeto
cd Teste_Intuitive_Care\frontend\health-insight-aggregator

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

## 📂 Estrutura do Projeto

```
📂 src/
    ├── 📂 components/
    │   └── 📂 operadoras/
    │           ├── OperadoraCard.tsx         # Componente de cartão de operadora
    │           ├── OperadoraDetails.tsx      # Componente de detalhes da operadora
    │           ├── OperadoraFilter.tsx       # Componente de filtros
    │           └── OperadoraList.tsx         # Componente de listagem de operadoras
    ├── 📂 pages/
    │       ├── Index.tsx                     # Página inicial
    │       ├── NotFound.tsx                  # Página de acesso a rotas inválidas
    │       └── Operadoras.tsx                # Página de listagem de operadoras
    ├── 📂 services/
    │       └── operadoraService.ts           # Serviço para comunicação com a API
    └── 📂 types/
            └── operadora.ts                  # Tipos relacionados às operadoras
```

## 📌 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---
📌 *Feito com 💙 por [José Neto](https://github.com/Neto-Pereira25)*
