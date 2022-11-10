INSERT INTO api.dev_user(
	 id_dev_token, creado, actualizado, usuario, contrasenia, sistema, clave, valido, activo)
	VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $2, MD5($3), $4, $5, CURRENT_TIMESTAMP, true);