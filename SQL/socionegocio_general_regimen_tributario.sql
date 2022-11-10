SELECT 
	r.C_TaxGroup_ID AS IdTabla
	,r.Value AS CodigoSAT
	,r.Description AS Regimen
FROM C_TaxGroup AS r
	WHERE 
	r.Isactive = 'Y'
	ORDER BY CodigoSAT ASC