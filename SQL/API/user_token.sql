-- SELECT 
-- --*
-- clave AS token 
-- FROM api.t_key AS tk
-- WHERE
-- clave = $1

SELECT 
--*
us.clave AS codigo_seguridad
,tk.clave_maestra AS clave_maestra
FROM api.dev_user AS us
	INNER JOIN api.dev_token AS tk
		ON us.id_dev_token = tk.id_dev_token
WHERE
us.clave = $1