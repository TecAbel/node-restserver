//obtener el puerto 
require('./config/config');

//inicializar express
const express = require('express')
const app = express();

//recibir post 1
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Hello World');
});
//consulta
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});
//registrar
app.post('/usuario', function(req, res) {

    //obtener lo enviado por post
    let body = req.body;

    //menaje de que falta un elemento
    //los status HTTP es un estándar 400 - bad request
    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })

    } else {
        res.json({
            persona: body
        });
    }

});
//actualizar
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id,

    });
});
//eliminar
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});