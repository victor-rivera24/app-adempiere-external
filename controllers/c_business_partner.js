const client_pgsql = require("../DB/pgsql")
const fs = require('fs');  

module.exports = { 

     /**
     * Muestra un listado de CFDI que tiene el sistema.
     * 
     * @param 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
    async CFDI(_params) {

        const params = [];
        let query = fs.readFileSync("./SQL/socionegocio_general_cfdi.sql","utf8");   

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
     * Muestra un listado de las formas de pagos que tiene el sistema.
     * 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async paymentMethods() {

        const params = [];
        let query = fs.readFileSync("./SQL/socionegocio_general_forma_pago.sql","utf8");   

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
     * Muestra un listado de los regimen tributarios que tiene el sistema.
     * 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async taxRegime(){

        const params = [];
        let query = fs.readFileSync("./SQL/socionegocio_general_regimen_tributario.sql","utf8");   

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
     * Muestra un listado de los estados de la república mexicana que tiene el sistema.
     * 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async statesMexicanRepublic(){

        const params = [];
        let query = fs.readFileSync("./SQL/socionegocio_general_estados.sql","utf8");   

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