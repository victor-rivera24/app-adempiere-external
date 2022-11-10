const { log } = require('console');
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const userapi = require('../controllers/c_api_user');

/**
 * Ejemplo de generar el token
    *http://localhost:5006/v1/rfv/generateToken

    {
        "vSystem"  : "ADempiere-Alternate"
        ,"vUser"  : "usuario.demo"
        ,"vPassword"  : "Sistemas$123"
        ,"vID"  : "1"

    }
 */
router.post('/rfv/generateToken', (req, res) => {

    // Read role and password from request body
    let p_System  = req.body.vSystem;
    let p_User  = req.body.vUser;
    let p_Password  = req.body.vPassword;
    let p_ID  = req.body.vID;
    let t_key = null;

    /**Busca la clave maestra en la base de datos */
    userapi.search_key_master(p_ID)
    .then(response_ => {

        if (response_.status_ == 'success' && response_.data_.length >=1 ) {

            t_key = response_.data_[0]['clave_maestra'];


                        /** Busca si el usuario ya existe en la base de datos. */
                        userapi.search_user(req.body)
                        .then(response_ => { 
                            // res.json(response_);
                            let p_Status = response_.status_;
                            let p_Data = response_.data_.length;

                                if (p_Status == 'success' && p_Data >= 1) {

                                    res.json(
                                        {
                                            "status": "success"
                                            ,"message" : "El token ya existe."
                                            ,"data" : response_.data_
                                        }
                                        );
                                    
                                } else {

                                    /**PROCESO PARA GENERA EL TOKEN 
                                     * En caso de que el usuario no exista en la base de datos
                                    */
                                    if (p_System === undefined || p_System === null )  {

                                        res.json(
                                                {
                                                    "status": "error"
                                                    ,"message" : "Se requiere todos los parámetros(1)."
                                                }
                                                );
                                
                                    }else if(p_User === undefined || p_User === null){            
                                
                                        res.json(
                                            {
                                                "status": "error"
                                                ,"message" : "Se requiere todos los parámetros(2)."
                                            }
                                            );
                                
                                    }else if(p_Password === undefined || p_Password === null){            
                                
                                        res.json(
                                            {
                                                "status": "error"
                                                ,"message" : "Se requiere todos los parámetros(2)."
                                            }
                                            );
                                
                                    }else if(p_ID === undefined || p_ID === null){            
                            
                                        res.json(
                                            {
                                                "status": "error"
                                                ,"message" : "Se requiere todos los parámetros(2)."
                                            }
                                            );

                                    } else {
                                
                                        // Generate an access token
                                        const token = jwt.sign( {system:p_System.toUpperCase(),user:p_User,passworc:p_Password}, t_key);
                                
                                        // res.json({
                                        //     "status": "success"
                                        //     ,token
                                        // });

                                            /**Proceso para Guardar el Token en la Base de Datos */
                                            userapi.add_user(req.body,token)
                                            .then(response_ => {
                                                // res.json(response_);
                                                if (response_.status_ == 'success') {

                                                    res.json(
                                                        {
                                                            "status": "success"
                                                            ,"message" : "Token Generado."
                                                            ,"data" : token
                                
                                                        }
                                                        );

                                                }else{

                                                    res.json(
                                                        {
                                                            "status": "error"
                                                            ,"message" : "error"
                                                            ,"data" : response_
                                
                                                        }
                                                        );

                                                }
                                                
                                            }).catch(err => { 
                                                console.log(err);
                                                return res.status(200).send({status:"error",data:err});
                                            }); 

                                    }

                                }            


                        }).catch(err => { 
                            console.log(err);
                            return res.status(200).send({status:"error",data:err});
                        }); 







            
        }else{

            t_key = null;
            res.json(
                {
                    "status": "error"
                    ,"message" : "error"
                    ,"data" : "No existe la clave maestra."

                }
                );

        }
        
    }).catch(err => { 
        console.log(err);
        return res.status(200).send({status:"error",data:err});
    });

});


// middleware that is specific to this router
router.use((req, res, next) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    // console.log('Timev4: ', hoy)
    next();

    let p1,p2,p3,p4,p5 = null;
    p1 = hoy;
    p2 = req.url;
    p3 = req.method;
    p4 = req.body;
    p5 = req.header('api-key');
    p6 = req.socket.remoteAddress;

    const params = [p1,p2,p3,p4,p5,p6];
    // console.log(params);

    userapi.access_create(params)
        .then(response_ => { 
            // res.json(response_);
            return true;
        }).catch(err => { 
            // console.log(err);
            // return res.status(200).send({status:"error",data:err});
            return false;
        }); 

        // console.log(req.socket.remoteAddress);
        // console.log(req.ip);
        // res.send("your IP is: " + req.ip);


  })





module.exports = router;