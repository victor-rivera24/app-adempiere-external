const client_api = require("../DB/API")
const fs = require('fs');  
const { log } = require("console");

module.exports = { 

     /**
     * Busca usuario en el sistema para obtener las credenciales.
     * 1
     * @param 
     * @since 11/11/2022 se genero el método
     * @author Victor Rivera
     */ 
    async search_user(_params) {
        
        const p1 = _params.vUser;
        const p2 = _params.vPassword;
        const p3 = _params.vSystem;
        const params = [p1,p2,p3];

        let query = fs.readFileSync("./SQL/API/user_search.sql","utf8");   

        const result_api = await client_api.query(query, params)
            .then(res => {
                return {status_:"success","data_":res.rows};
            }).catch( e => {
                console.log(e);
                return {status_:"error","data_":e.stack}; 
            }
        );
        return result_api;
    },


     /**
     * Se crea el usuario en el sistema con sus credenciales correpondientes.
     * 2
     * @param 
     * @since 05/11/2022 se genero el método
     * @author Victor Rivera
     */ 
    async add_user(_params,_token) {

        const p1 = _params.vID;
        const p2 = _params.vUser;
        const p3 = _params.vPassword;
        const p4 = _params.vSystem;
        const p5 = _token;
        const params = [p1,p2,p3,p4,p5];

        console.log(params);
        let query = fs.readFileSync("./SQL/API/user_create.sql","utf8");   

        const result = await client_api.query(query, params)
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
     * Busca la clave maestra.
     * 
     * @param 
     * @since 11/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async search_key_master(_ID) {
        
        const p1 = _ID;
        const params = [p1];

        let query = fs.readFileSync("./SQL/API/key_search.sql","utf8");   

        const result_api = await client_api.query(query, params)
            .then(res => {
                return {status_:"success","data_":res.rows};
            }).catch( e => {
                console.log(e);
                return {status_:"error","data_":e.stack}; 
            }
        );
        return result_api;
    },


     /**
     * Busca usuario en el sistema y el token.
     * 
     * @param 
     * @since 11/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async search_user_token(_token) {
        
        const p1 = _token;
        const params = [p1];

        let query = fs.readFileSync("./SQL/API/user_token.sql","utf8");   

        const result_api = await client_api.query(query, params)
            .then(res => {
                return {status_:"success","data_":res.rows};
            }).catch( e => {
                console.log(e);
                return {status_:"error","data_":e.stack}; 
            }
        );
        return result_api;
    },



     /**
     * Registra las movimientos consultados.
     * 
     * @param 
     * @since 08/11/2022 se genero el método
     * @author Victor Rivera
     */ 
      async access_create(_params) {
        
        const params = _params;

        let query = fs.readFileSync("./SQL/API/access_create.sql","utf8");   

        const result_api = await client_api.query(query, params)
            .then(res => {
                return {status_:"success","data_":res.rows};
            }).catch( e => {
                console.log(e);
                return {status_:"error","data_":e.stack}; 
            }
        );
        return result_api;
    },



}