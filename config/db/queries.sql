SELECT DISTINCT cd_conta_contabil, descricao 
FROM demonstrativos_contabeis 
WHERE descricao LIKE '%EVENTOS/SINISTROS CONHECIDOS OU AVISADOS%' 
	OR descricao LIKE '%AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR%'
ORDER BY cd_conta_contabil;


SELECT o.razao_social ,
       SUM(d.vl_saldo_final) AS total_despesa
FROM demonstrativos_contabeis d
JOIN operadoras o ON d.reg_ans = o.registro_ans
WHERE d.cd_conta_contabil IN (
	SELECT DISTINCT cd_conta_contabil 
	FROM demonstrativos_contabeis 
	WHERE descricao LIKE '%EVENTOS/SINISTROS CONHECIDOS OU AVISADOS%' 
		OR descricao LIKE '%AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR%'
	ORDER BY cd_conta_contabil
)
  AND d."data" >= date_trunc('quarter', CURRENT_DATE - INTERVAL '1 year') + INTERVAL '9 months'
  AND d."data" < date_trunc('year', CURRENT_DATE)
GROUP BY o.razao_social 
ORDER BY total_despesa DESC
LIMIT 10;

select date_trunc('year', CURRENT_DATE)

SELECT o.razao_social , 
       SUM(d.vl_saldo_final) AS total_despesa
FROM demonstrativos_contabeis d
JOIN operadoras o ON d.reg_ans = o.registro_ans
WHERE d.cd_conta_contabil IN (
	SELECT DISTINCT cd_conta_contabil 
	FROM demonstrativos_contabeis 
	WHERE descricao LIKE '%EVENTOS/SINISTROS CONHECIDOS OU AVISADOS%' 
		OR descricao LIKE '%AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR%'
	ORDER BY cd_conta_contabil
)
  AND d.data >= date_trunc('year', CURRENT_DATE  - INTERVAL '1 year')
	AND d.data < date_trunc('year', CURRENT_DATE)
GROUP BY o.razao_social 
ORDER BY total_despesa DESC
LIMIT 10;



