const express = require('express');
const Usuario = require('../modules/usuarios');
const app = express();
const bcrypt = require('bcrypt');


app.post('/login', (rep, res) => {

    let body = req.body;

    //regresar solo uno (correo)


    res.json({
        ok: true

    });
});





module.exports = app;