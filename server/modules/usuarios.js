const mongoose = require('mongoose');
//validator
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

//setting usuarios válidos
let rolesValidos = {
        values: ['ADMIN_ROLE', 'USER_ROLE'],
        message: '{VALUE} no es un rol válido'
    }
    //similar a un create table 
let usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//no retornar la contraseña

usuariosSchema.methods.toJSON = function() {
    let user = this;
    let userObjetc = user.toObject();
    delete userObjetc.password;
    return userObjetc;
}

//mensaje validator

usuariosSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Usuario', usuariosSchema);