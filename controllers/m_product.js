const client_pgsql = require("../DB/pgsql")
const fs = require('fs');  
const { log } = require("console");

module.exports = { 

     /**
     * Muestra todos los productos y una lista de precio.
     * 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
    async allProduct(_params) {
        /** Listado de parametros se utilizo GET*/
        const p1 = _params.vClient;
        const p2 = _params.vCodeProduct;
        const p3 = _params.vListPrice;

        const params = [p1,p2,p3];
        let query = fs.readFileSync("./SQL/producto_general.sql","utf8");   

        const result = await client_pgsql.query(query, params)
            .then(res => {
                return {status_:"success","data_":res.rows};
            }).catch( e => {
                console.log(e);
                return {status_:"error","data_":e.stack}; 
            }
        );
        return result;
    },


     /**
     * Muestra un producto en específico con imagen en Base64.
     * 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async productImage(_params) {
        /** Listado de parametros se utilizo GET*/
        const p1 = _params.vClient;
        const p2 = _params.vCodeProduct;

        const params = [p1,p2];
        let query = fs.readFileSync("./SQL/producto_imagen.sql","utf8");   

        const result = await client_pgsql.query(query, params)
            .then(res => {
                return {status_:"success","data_":res.rows};
            }).catch( e => {
                console.log(e);
                return {status_:"error","data_":e.stack}; 
            }
        );
        return result;
    },




}