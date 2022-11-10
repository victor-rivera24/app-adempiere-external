SELECT 
* 
FROM (
    SELECT 
	
		--Datos Generales del Producto	
    p.m_product_id AS idTabla
    ,p.value AS Producto_Codigo
		,p.name AS Producto_Nombre
		,p.help AS Producto_Observaciones
		,encode(img.binarydata, 'base64')	AS Producto_Imagen64
    FROM m_product AS p    
    LEFT JOIN c_uom AS cu 
		ON p.c_uom_id = cu.c_uom_id  
	LEFT JOIN AD_Image AS img
		ON img.ad_image_id = p.logo_id	
	
    WHERE  
        p.ad_client_id = $1   
        AND p.isActive = 'Y'
        AND p.value  = $2
    
	) AS nM
	

