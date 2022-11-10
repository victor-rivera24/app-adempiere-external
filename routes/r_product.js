const { log } = require('console');
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const userapi = require('../controllers/c_api_user');
const product = require('../controllers/m_product');

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
 * http://localhost:5006/v1/rfv/allProduct?vClient=1000000&vCodeProduct=P05&vListPrice=1000020
 */
router.get('/rfv/allProduct',verifyTokenUser, function (req, res, next) {
    let params = req.query;
    product.allProduct(params)
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
 * http://localhost:5006/v1/rfv/productImage?vClient=1000000&vCodeProduct=P05FR0006
 */
router.get('/rfv/productImage',verifyTokenUser, function (req, res, next) {
    let params = req.query;
    product.productImage(params)
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
}); 


module.exports = router;
