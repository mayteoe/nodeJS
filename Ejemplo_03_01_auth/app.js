const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cities = require('cities.json');


const app = express();
const router = express.Router();
const port = 8080;

// Configuracion
const logFile = fs.createWriteStream('./output.log', { flags: 'w' });
const mykey = 'miclavesecreta';

// Middleware para logear todas las peticiones que vienen al servidor
let log = ((req, res, next) => {
    logFile.write(new Date().toISOString() + `Request recived\r\n`);
    next();
});

// Middleware para comprobar si un usuario o no está autenticado para dar acceso o no a la ruta
let rutasProtegidas = router.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, mykey, (err, decoded) => {
            if (err) {
                return res.json({
                    message: 'unauthorized',
                    output: err.message
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            message: 'unauthorized'
        });
    }
});

app.use(bodyParser.urlencoded({ extended: true })); // {param1=valor1,param2=valor2} 
app.use(bodyParser.json());
app.use(log);


// Variable de autenticación
let auth = false;

/*
 * RUTAS DE LA APLICACIÓN
 * */
app.get('/', (req, res) => {
    res.json({
        status: true
    });
});

app.post('/auth', (req, res) => {
    if (req.body.user === "nodejs" && req.body.password === "password") {
        const payload = {
            check: true,
            idUsuario: 1230492
        };
        const token = jwt.sign(payload, mykey, {
            expiresIn: 3600
        });
        res.json({
            status: true,
            token: token
        });
    } else {
        res.json({
            status: false,
            message: "User invalid"
        });
    }
});

app.get('/getByCountry/:country', rutasProtegidas, (req, res) => {
    let country = req.params.country;
    let response = cities.filter(city => city.country == country);
    res.json(response);
});

app.get('/getByName/:name', rutasProtegidas, (req, res) => {
    let name = req.params.name;
    let response = cities.filter(city => city.name.toLowerCase().includes(name))
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});