SELECT
	rf.Value AS IdTabla
	,tr.name AS FormaPago
--,tr.*
FROM AD_Ref_List AS rf
	INNER JOIN AD_Ref_List_Trl AS tr 
		ON tr.AD_Ref_List_ID = rf.AD_Ref_List_ID
WHERE
	rf.AD_Reference_ID = 195
	AND rf.Isactive = 'Y'	