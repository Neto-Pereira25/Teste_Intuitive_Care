SELECT DISTINCT cd_conta_contabil, descricao 
FROM demonstrativos_contabeis 
WHERE descricao LIKE '%EVENTOS/SINISTROS CONHECIDOS OU AVISADOS%' 
	OR demonstrativos_contabeis.descricao o LIKE '%AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR%'
ORDER BY cd_conta_contabil;


SELECT o.nome_fantasia, 
       SUM(d.vl_saldo_final) AS total_despesa
FROM demonstrativos_contabeis d
JOIN operadoras o ON d.reg_ans = o.registro_ans
WHERE d.cd_conta_contabil = 411
  AND d.data >= '2024-10-01'
  AND d.data <= '2024-12-31'
GROUP BY o.nome_fantasia
ORDER BY total_despesa DESC
LIMIT 10;

SELECT o.nome_fantasia, 
       SUM(d.vl_saldo_final) AS total_despesa
FROM demonstrativos_contabeis d
JOIN operadoras o ON d.reg_ans = o.registro_ans
WHERE d.cd_conta_contabil = 411
  AND d.data >= '2024-01-01'
  AND d.data <= '2024-12-31'
GROUP BY o.nome_fantasia
ORDER BY total_despesa DESC
LIMIT 10;



