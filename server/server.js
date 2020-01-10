//obtener el puerto 
require('./config/config');

//inicializar express
const express = require('express')
const app = express();
//para conexion a base de datos
const mongoose = require('mongoose');


//recibir post 1
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//llamar a rutas
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URL_DB,
    //para evitar los warnings
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err, resp) => {
        if (err) throw err;

        console.log('Base de datos Online');
    });
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});