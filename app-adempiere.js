const express = require('express');
// const cors = require( 'cors');
// const https = require('https');
// const fs = require('fs');
// const fileUpload = require( 'express-fileupload');
// const history = require( 'connect-history-api-fallback');
// const path = require( 'path');
const bodyParser = require( 'body-parser');
const app = express();

//Headers
// const options = {
//     key: fs.readFileSync('SSL/_.refividrio.com.mx.key'),
//     cert: fs.readFileSync('SSL/_.refividrio.com.mx.crt')
// };

// Middlewares
// app.use(cors());
// app.use(function (req, res, next) {
//     //Enabling CORS  
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//     next();
// }); 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }));


app.get('/', function (req, res) {
      res.send('La API se esta ejecutando.');
    });

// // Middlewares for Vue
// app.use(history());
// app.use(express.static(path.join(__dirname, 'public')));

/** Modo Produccion */
// https.createServer(options, app).listen(6868);

const port = process.env.PORT || 5006;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
}) 


// Routes
// app.use('/v1', require('./routes/r_token'));
// app.use('/v1', require('./routes/r_whatsapp'));
// app.use('/v1', require('./routes/r_cp'));
app.use('/v1', require('./routes/r_token'));

app.use('/v1', require('./routes/r_product'));
app.use('/v1', require('./routes/r_business_partner'));
