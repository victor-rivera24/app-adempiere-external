const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const businesspartner = require('../controllers/c_business_partner');
const userapi = require('../controllers/c_api_user');

// middleware to validate token (rutas protegidas)
const verifyTokenUser = (req, res, next) => {

    const token = req.header('api-key');
    if (!token) 
    return res.status(401).json({ status: 'error' ,message: 'Access denied' })
    try {
        userapi.search_user_token(token)
        .then(response_ => { 

            if ( response_.status_ == 'success' && response_.data_.length >= 1) {

                const verified = jwt.verify(response_.data_[0].codigo_seguridad, response_.data_[0].clave_maestra);
                req.user = verified;
                next(); // continuamos

            }else{
                res.json(
                    {
                        "status": "error"
                        ,"message" : "No se encuentra el token indicado"
                    }
                    );
            }            

        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        });
    } catch (error) {
        res.status(400).json({status: 'error', message: 'token no es válido'})
    }
}


/**
 * 
 * Ejemplo
 * http://localhost:5006/v1/rfv/CFDI
 */
router.get('/rfv/CFDI', verifyTokenUser, function (req, res, next) {
    let params = [];
    businesspartner.CFDI(params)
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
}); 


/**
 * 
 * Ejemplo
 * http://localhost:5006/v1/rfv/paymentMethods
 */
router.get('/rfv/paymentMethods', verifyTokenUser, function (req, res, next) {
    let params = [];
    businesspartner.paymentMethods()
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
}); 


/**
 * 
 * Ejemplo
 * http://localhost:5006/v1/rfv/taxRegime
 */
router.get('/rfv/taxRegime', verifyTokenUser, function (req, res, next) {
    let params = [];
    businesspartner.taxRegime()
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
});


/**
 * 
 * Ejemplo
 * http://localhost:5006/v1/rfv/statesMexicanRepublic
 */
router.get('/rfv/statesMexicanRepublic', verifyTokenUser, function (req, res, next) {
    let params = [];
    businesspartner.statesMexicanRepublic()
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
});

module.exports = router;
