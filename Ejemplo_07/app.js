const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);
const sqlite3 = require('sqlite3').verbose();
const emailValidator = require('email-validator');

const app = express();
const port = 8080;
var session = null;
const db = new sqlite3.Database('./clientes.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err, data) => {
    if (err) {
        // TODO: Enviar correo informando del error
        console.log(err);
        process.exit();
    }

    db.exec(`CREATE TABLE IF NOT EXISTS "Clientes" (
        "Id"	INTEGER,
        "Nombre"	TEXT,
        "Email"	TEXT,
        PRIMARY KEY("Id")
    ); CREATE TABLE IF NOT EXISTS "Usuarios" (
        "Id"	INTEGER,
        "Email"	TEXT,
        "Password"	TEXT,
        PRIMARY KEY("Id")
    )`, (err) => {
        if (err) {
            console.log(err);
            process.exit();
        }
    });
});

let server = app.listen(port, () => {
    console.log(`Se ha iniciado el servidor en el puerto ${port}`);
});

// Definimos nuestros middlewares
let checkSession = ((req, res, next) => {
    session = req.session;
    if (session.auth === true) {
        next();
    } else {
        res.redirect('/403');
    }
});

// Configuración express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware global
app.use(sessions({
    secret: 'MiClave',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    store: new FileStore({})
}));
app.use(cookieParser());
app.use(express.urlencoded());

// Rutas
app.get('/login', (req, res) => {
    res.render('pages/login', { _showMenu: false });
});
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    db.all(`SELECT Id, Email FROM "Usuarios" WHERE Email=$email AND Password=$password LIMIT 1;`, { $email: email, $password: password }, (err, rows) => {
        if (err) {
            _message = 'Hay problemas con el servidor de base de datos.';
            console.log(err);
        } else {
            if (rows.length > 0) {
                session = req.session;
                session.auth = true;
                session.userId = rows[0].Id;
                session.email = rows[0].Email; // id, email, roles, permisos
                res.render('pages/dashboard', { _showMenu: true });
            } else {
                res.render('pages/login', { _showMenu: false, _errorMessage: 'User invalid' });
            }
        }
    });
});


app.get('/', checkSession, (req, res) => {
    res.render('pages/dashboard', { _showMenu: true });
});

app.get('/list', checkSession, (req, res) => {
    _showList(req, res);
});

app.get('/create', checkSession, (req, res) => {
    let _cliente = {}
    _cliente.name = '';
    _cliente.email = '';
    res.render('pages/create', { _showMenu: true, _cliente: _cliente });
});
app.post('/create', checkSession, (req, res) => {
    let name = req.body.name;
    let email = req.body.email.toLowerCase();

    // Validar los datos de entrada y comprobar que el email es único
    if (emailValidator.validate(email) == false) {
        let _cliente = {}
        _cliente.name = name;
        _cliente.email = email;

        res.render('pages/create', { _showMenu: true, _cliente: _cliente, _message: `El email ${email} no es correcto.` });
    } else {
        // Comprobamos que no hay usuarios duplicados en bbdd
        db.all(`SELECT Id FROM "Clientes" WHERE Email=$email LIMIT 1;`, { $email: email }, (err, rows) => {
            if (err) {
                _message = 'Hay problemas con el servidor de base de datos.';

                let _cliente = {}
                _cliente.name = name;
                _cliente.email = email;

                res.render('pages/create', { _showMenu: true, _cliente: _cliente, _message: _message });
            } else {
                if (rows.length > 0) {
                    let _cliente = {}
                    _cliente.name = name;
                    _cliente.email = email;
                    res.render('pages/create', { _showMenu: true, _cliente: _cliente, _message: `El email ${email} está en uso por otro cliente.` });
                } else {

                    // Almacenamos en BD la información
                    let _message;
                    db.run(`INSERT INTO Clientes (Nombre, Email) VALUES ($name, $email);`, { $name: name, $email: email }, (err) => {
                        if (err) {
                            _message = 'Hay problemas con el servidor de base de datos.';
                            console.log(err);
                        } else {
                            _message = 'Se ha guardado correctamente.';
                        }

                        _showList(req, res, _message)
                    });
                }
            }
        });
    }
});

app.get('/edit/:id', checkSession, (req, res) => {
    let idCliente = req.params.id;

    // Obtenemos la información del usuario {:id}
    let _message;
    let _cliente;
    db.all(`SELECT Id, Nombre, Email FROM "Clientes" WHERE Id=$id LIMIT 1;`, { $id: idCliente }, (err, rows) => {
        if (err) {
            _message = 'Hay problemas con el servidor de base de datos.';
            console.log(err);
        } else {
            if (rows.length > 0)
                _cliente = rows[0];
            else
                _message = 'No se encuentra el cliente a editar.';
        }

        res.render('pages/edit', { _showMenu: true, _cliente: _cliente, _message: _message });
    });

});
app.post('/edit', checkSession, (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email.toLowerCase();

    // Validar los datos de entrada y comprobar que el email es único
    if (emailValidator.validate(email) == false) {
        let _cliente = {}
        _cliente.Id = id;
        _cliente.Nombre = name;
        _cliente.Email = email;
        let _message = `El email ${email} no es correcto.`
        res.render('pages/edit', { _showMenu: true, _cliente: _cliente, _message: _message });
    } else {
        db.all(`SELECT Id FROM "Clientes" WHERE Email=$email AND Id != $id LIMIT 1;`, { $email: email, $id: id }, (err, rows) => {
            if (err) {
                _message = 'Hay problemas con el servidor de base de datos.';

                let _cliente = {}
                _cliente.Id = id;
                _cliente.Nombre = name;
                _cliente.Email = email;

                res.render('pages/edit', { _showMenu: true, _cliente: _cliente, _message: _message });
            } else {
                if (rows.length > 0) {
                    let _cliente = {}
                    _cliente.Id = id;
                    _cliente.Nombre = name;
                    _cliente.Email = email;
                    res.render('pages/edit', { _showMenu: true, _cliente: _cliente, _message: `El email ${email} está en uso por otro cliente.` });
                } else {
                    // Actualizamos el usuario en BD
                    let _message;
                    db.run(`UPDATE Clientes SET Nombre = $name, Email = $email WHERE Id = $id;`, { $id: id, $name: name, $email: email }, (err) => {
                        if (err) {
                            _message = 'Hay problemas con el servidor de base de datos.';
                            console.log(err);
                        } else {
                            _message = 'Se ha actualizado correctamente.';
                        }

                        _showList(req, res, _message)
                    });
                }
            }
        });
    }
});

app.get('/delete/:id', checkSession, (req, res) => {
    let id = req.params.id;

    // Eliminamos el usuario en BD
    let _message;
    db.run(`DELETE FROM Clientes WHERE Id = $id;`, { $id: id }, (err) => {
        if (err) {
            _message = 'Hay problemas con el servidor de base de datos.';
            console.log(err);
        } else {
            _message = 'Se ha eliminado correctamente.';
        }

        _showList(req, res, _message)
    });
});

app.get('/403', (req, res) => {
    res.render('pages/403', { _showMenu: false });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('pages/logout', { _showMenu: false });
});

process.on('SIGINT', () => {
    db.close((err) => {
        console.log('Cerramos la conexión a BD');
        process.exit();
    });
});


function _showList(req, res, _message) {
    // Obtenemos el listado de clientes de BD
    let _clientes = [];

    db.all(`SELECT Id, Nombre, Email FROM "Clientes";`, (err, rows) => {
        if (err) {
            _message = 'Hay problemas con el servidor de base de datos.';
            console.log(err);
        } else {
            _clientes = rows;
        }

        res.render('pages/list', { _showMenu: true, clientes: _clientes, _message: _message });
    });
}