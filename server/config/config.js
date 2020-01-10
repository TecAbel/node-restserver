/**
 * ============================
 *   PUERTO
 * ============================
 */

process.env.PORT = process.env.PORT || 3000;


/**
 * ===========================
 *          Entorno
 * ===========================
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * ===========================
 *      BASE DE DATOS
 * ===========================
 */

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://strider:jm7liLkgkLcvmzM5@node-cafe-wuxcl.mongodb.net/cafe';
}

//se pueden inventar variables de entorno

process.env.URL_DB = urlDB;