SELECT 
--*
C_Region_ID AS IdTabla
--,Name AS Abreviatura
,Description AS EstadoNombre  

FROM C_Region AS r
WHERE 
	C_Country_ID = 247 --MEXICO