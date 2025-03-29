# 📌 Projeto: Consulta de Operadoras de Saúde

## 📖 Descrição
Este projeto é fruto de um teste para vaga de estágio na Intuitive Care e consiste em 4 etapas:
* 1ª Teste de Web Scraping
    * Objetivo: Automatizar o download de arquivos PDF do site da ANS e compactá-los
    * Principais Pontos:
        * Acessar a página da ANS via requests;
        * Identificar os links para os anexos I e II em PDF;
        * Baixar os arquivos e compactá-los em um formato ZIP/RAR;

* 2ª Teste de Transformação de Dados
    * Objetivo: Extrair e estruturar os dados do Anexo I para facilitar a análise.
    * Principais Pontos:
        * Ler o Anexo I e extrair a tabela "Rol de Procedimentos e Eventos em Saúde" usando tabula-py;
        * Fazer o tratamento dos dados e substituir abreviações das colunas OD e AMB pelas descrições completas;
        * Transformar os dados em um CSV estruturado;
        * Compactar o CSV em um arquivo ZIP;
        
* 3ª Teste de Banco de Dados
    * Objetivo: Criar um banco de dados relacional com os dados das operadoras de saúde e realizar análises.
    * Principais Pontos:
        * Baixar os arquivos financeiros dos últimos 2 anos e os dados cadastrais das operadoras;
        * Criar tabelas SQL para armazenar esses dados corretamente;
        * Importar os arquivos garantindo o encoding correto (UTF-8);
        * Desenvolver queries para analisar as 10 operadoras com maiores despesas na categoria 'EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR' no último trimestre (Out - Dez) e no último ano;

* 4ª Teste de API
    * Objetivo: Criar um servidor em Python para buscar e exibir dados das operadoras.
    * Principais Pontos:
        * Criar um backend em Python (FastAPI);
        * Desenvolver uma rota de busca textual para encontrar operadoras pelo nome;
        * Criar um frontend com React.js para exibir os resultados;
        * Elaborar uma coleção no Postman para demonstrar o funcionamento da API;

## 🚀 Tecnologias Utilizadas
- **Frontend:** React.js
- **Backend:** Python com FastAPI
- **Banco de Dados:** PostgreSQL
- **Estilização:** Bootstrap

## 📂 Estrutura do Projeto
```
📦 projeto-operadoras
├── 📂 src
│   │   ├── 📂 api
│   │   ├── 📂 config
│   │   │   │    ├── 📂 db
│   │   ├── 📂 data_transformation
│   │   ├── 📂 database
│   │   ├── 📂 web_scraping
│   │   ├── 📂 frontend
│   │   │   ├── 📂 src
│   │   │   │    ├── 📂 components
│   │   │   │    ├── 📂 pages
│   │   │   │    ├── 📂 services
│   │   │   │    └── 📜 main.tsx
└── 📜 README.md
```

## 🔧 Instalação e Configuração
### **Pré-requisitos**
- Node.js e npm/yarn instalados
- Python instalado
- PostgreSQL configurado

## ▶️ Como Rodar a API
### **Passo 1: Clonar o repositório**
```bash
git clone https://github.com/seu-usuario/projeto-operadoras.git
cd projeto-operadoras
```

### **Passo 2: Crie e ative um ambiente virtual**
```bash
python -m venv <nome venv>
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
```

### **Passo 3: Instale as dependências**
```bash
pip install -r requirements.txt
```
ou
```bash
pip install psycopg2 fastapi uvicorn beautifulsoup4 pandas requests tabula-py
```

### **Passo 4: Execute os Scripts para obtenção do dados**
#### 1º Execute o script para baixar os PDFs:
  ##### OBS: Esse script vai criar a pasta data_files, é nessa pasta que ficara os arquivos .csv, .pdf e .zip
```bash
python .\web_scraping\scraper.py
```

#### 2º Execute o script para importamos as tabelas dos PDFs baixados:
```bash
python .\data_transformation\extract_table.py
```

#### 3º Execute o script para baixar os dados dos ultimos 2 anos (2023 e 2024):
```bash
python .\database\download_files.py
```

#### 4º Crie o banco de dados, as tables e insira os dados nas tabelas:
  ##### O código SQL está em: ./config/db:
  * script.sql
  * queries.sql
  ##### OBS: O código sql para inserir os dados usa o caminho dos arquivos csv obtidos no 3º passo, talvez seja necessário modificar dependendo do local que fique o seu projeto

### **Passo 5: Rode a API do projeto**
```bash
uvicorn routes:app --reload
```

### **Passo 6: Rode o frontend do projeto**
#### 1º Execute o projeto com o comando:
```bash
cd .\frontend\health-insight-aggregator
npm run dev
```
#### 2º Acesse o link do projeto


## 📌 Rotas da API
### **Operadoras**
- `GET /operadoras` → Lista todas as operadoras
- `GET /operadoras/{registro_ANS}` → Busca operadora pelo registro ANS
- `POST /operadoras/filtrar` → Filtra operadoras

## 🎯 Funcionalidades
✅ Buscar todas as operadoras registradas
✅ Filtrar por nome, modalidade, uf e cidade
✅ Interface amigável e responsiva  

## 📌 Contribuição
Sinta-se à vontade para abrir issues e pull requests para melhorias!

---
📌 *Feito com 💙 por [José Neto](https://github.com/Neto-Pereira25)*
