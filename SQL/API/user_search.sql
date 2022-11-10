SELECT 
--*
clave AS token 
FROM api.dev_user AS tk
WHERE
usuario = $1
AND contrasenia = MD5($2)
AND sistema = $3