-- DROP TABLE demonstrativos_contabeis;
-- DROP TABLE operadoras;

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS ans_data;

-- Usar o banco de dados
\c ans_data; -- Para PostgreSQL
-- USE ans_data; -- Para MySQL


-- Criar tabela de operadoras ativas
CREATE TABLE IF NOT EXISTS operadoras (
    id SERIAL PRIMARY KEY,                 -- ID autoincrementado
    registro_ans VARCHAR(6) UNIQUE NOT NULL, -- Código único da operadora
    cnpj VARCHAR(14) NOT NULL,
    razao_social VARCHAR(140) NOT NULL,
    nome_fantasia VARCHAR(140),
    modalidade VARCHAR(50),
    logradouro VARCHAR(40),
    numero VARCHAR(20),
    complemento VARCHAR(40),
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    uf VARCHAR(2),
    cep VARCHAR(8),
    ddd VARCHAR(4),
    telefone VARCHAR(20),
    fax VARCHAR(20),
    endereco_eletronico VARCHAR(255),
    representante VARCHAR(50),
    cargo_representante VARCHAR(40),
    regiao_de_comercializacao NUMERIC(10, 2),
    data_registro_ans DATE
);

-- Criar tabela de demonstrativos contábeis
CREATE TABLE IF NOT EXISTS demonstrativos_contabeis (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    reg_ans VARCHAR(6) NOT NULL, -- Referência à operadora
    cd_conta_contabil INT NOT NULL,
    descricao VARCHAR(150),
    vl_saldo_inicial NUMERIC(15,2),
    vl_saldo_final NUMERIC(15,2),
    FOREIGN KEY (reg_ans) REFERENCES operadoras(registro_ans)
);


-- Importar dados das operadoras ativas
COPY operadoras(
    registro_ans, cnpj, razao_social, nome_fantasia, modalidade, 
    logradouro, numero, complemento, bairro, cidade, uf, cep, 
    ddd, telefone, fax, endereco_eletronico, representante, 
    cargo_representante, regiao_de_comercializacao, data_registro_ans
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\operadoras_ativas.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

-----------------------------------------------------
DROP TABLE temp_demonstrativos_contabeis;

CREATE TEMP TABLE temp_demonstrativos_contabeis (
    data DATE, 
    reg_ans VARCHAR(6), 
    cd_conta_contabil INT, 
    descricao VARCHAR(255), 
    vl_saldo_inicial NUMERIC, 
    vl_saldo_final NUMERIC
);

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\1T2023.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\2T2023.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\3T2023.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\4T2023.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\1T2024.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\2T2024.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\3T2024.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';

COPY temp_demonstrativos_contabeis (
    data, reg_ans, cd_conta_contabil, descricao, 
    vl_saldo_inicial, vl_saldo_final
)
FROM 'C:\workspace\teste_intuitive_care\data_files\database_files\4T2024.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'UTF8';


INSERT INTO demonstrativos_contabeis (data, reg_ans, cd_conta_contabil, descricao, vl_saldo_inicial, vl_saldo_final)
SELECT t.data, t.reg_ans, t.cd_conta_contabil, t.descricao, t.vl_saldo_inicial, t.vl_saldo_final
FROM temp_demonstrativos_contabeis t
WHERE EXISTS (
    SELECT 1 FROM operadoras o WHERE o.registro_ans = t.reg_ans
);


---------------------------------------
