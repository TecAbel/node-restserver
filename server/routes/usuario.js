//inicializar express
const express = require('express');
const app = express();
//bcrypt
const bcrypt = require('bcrypt');
//underscore, para solo actualizar los que yo quiero
const _ = require('underscore');

//utilizar esquema de la BD
const Usuario = require('../modules/usuarios');

//consulta
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    //condiciones en el primer campo, en el segundo solo los campos que quiero mostrar
    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //para hacer un conteo y establecer condiciones del query
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    listado: usuarios,
                    cantidad: conteo
                });

            })



        });
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
    //solo lo que quiero que se pueda actualizar 
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



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
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.json({
                ok: false,
                mensaje: err
            })
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'No se encontró el usuario'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    });

});

module.exports = app;