SELECT 
* 
FROM (
    SELECT 
	
		--Datos Generales del Producto	
        p.m_product_id AS idTabla
        ,p.value AS Producto_Codigo
		,p.name AS Producto_Nombre
		,p.help AS Producto_Observaciones
		,cu.name AS Producto_Unidad  
        ,categoria.name AS Producto_Categoria
        ,sub_categoria.name AS Producto_SubCategoria
        ,marca.name AS Producto_Marca
  
		-- Medidas Producto
		,p.weight AS Producto_Peso
        ,p.shelfheight AS Producto_Alto
        ,p.shelfdepth AS Producto_Largo

		-- Precio
        ,(rf_pricelist_ecommerce(p.m_product_id,$3, now()::date) * 1.16) AS Producto_Precio
	
    FROM m_product AS p    
    LEFT JOIN c_uom AS cu 
		ON p.c_uom_id = cu.c_uom_id  
    LEFT JOIN M_Product_Category AS categoria 
		ON categoria.M_Product_Category_ID = p.M_Product_Category_ID 
    LEFT JOIN M_Product_Classification AS sub_categoria 
		ON sub_categoria.M_Product_Classification_ID = p.M_Product_Classification_ID
    LEFT JOIN M_Product_Group AS marca 
		ON marca.M_Product_Group_ID = p.M_Product_Group_ID       
	
    WHERE  
        p.ad_client_id=$1   
        AND p.isActive = 'Y'
        AND (p.value ILIKE '%' || $2 || '%' OR p.name ILIKE '%' || $2 || '%')
        --#1
        --#3
        --#4
        --#5
        --#6
        --#7
	
	) AS nM
	
ORDER BY nM.Producto_Codigo ASC