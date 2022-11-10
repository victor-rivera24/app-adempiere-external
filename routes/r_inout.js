const { Router } = require('express');
const router = Router();
const businesspartner = require('../controllers/c_business_partner');

// const jwt = require('jsonwebtoken');
// const key = '[Wh@t5@pp$<>PR0GR@M@C10N&&D3S@RR0110<>R35T#22]';

// middleware to validate token (rutas protegidas)
// const verifyToken = (req, res, next) => {

//     const token = req.header('api-key');

//     if (!token) 
    
//     return res.status(401).json({ status: 'error' ,message: 'Access denied' })

//     try {
//         const verified = jwt.verify(token, key);
//         // console.log("Entro2");
//         // console.log(verified);
//         // console.log("Entro3");

//         req.user = verified;
//         console.log(req.user);
//         // console.log(req.user );
//         // console.log("Entro4");
//         next(); // continuamos

//     } catch (error) {
//         res.status(400).json({status: 'error', message: 'token no es válido'})
//     }


// }


// middleware that is specific to this router
router.use((req, res, next) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    console.log('Timev2: ', hoy)
    next();
  })



router.get('/rfv/CFDI', function (req, res, next) {
    let params = [];
    businesspartner.CFDI(params)
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
}); 


router.get('/rfv/paymentMethods', function (req, res, next) {
    let params = [];
    businesspartner.paymentMethods()
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
}); 


router.get('/rfv/taxRegime', function (req, res, next) {
    let params = [];
    businesspartner.taxRegime()
        .then(response_ => { 
            res.json(response_);
        }).catch(err => { 
            console.log(err);
            return res.status(200).send({status:"error",data:err});
        }); 
});

router.get('/rfv/statesMexicanRepublic', function (req, res, next) {
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
