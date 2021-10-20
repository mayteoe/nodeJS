const dotenv = require('dotenv');

// Cargamos el archivo .env
dotenv.config();

let config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080
}

module.exports = config;