//inicializar express
const express = require('express')
const app = express();
//bcrypt
const bcrypt = require('bcrypt');

//utilizar esquema de la BD
const Usuario = require('../modules/usuarios');

//consulta
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});
//registrar
app.post('/usuario', function(req, res) {

    //obtener lo enviado por post
    let body = req.body;

    //instancia de esquema
    let usuraio = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        role: body.role
    });

    //guardar en la BD
    usuraio.save((err, usuarioDB) => {
        //menaje de que falta un elemento
        //los status HTTP es un estándar 400 - bad request
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });




});
//actualizar
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB

        });
    })


});
//eliminar
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

module.exports = app;