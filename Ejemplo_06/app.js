const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();
const port = 8080;
var session = { auth: false };

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(sessions({
    secret: "Mi_Clave",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let checkSession = ((req, res, next) => {
    session = req.session;
    if (session.auth === true) {
        next();
    } else {
        res.redirect('/login');
    }
});



app.get('/login', (req, res) => {
    res.render('pages/login', { _showMenu: false });
});
app.post('/login', (req, res) => {
    // Comprobamos usuario y contraseña
    let email = req.body.email;
    let password = req.body.password;

    if (email == "user@email.com" && password == "password") {
        session = req.session;
        session.auth = true;
        session.email = req.body.email;
        res.redirect('/');
    } else {
        res.render('pages/login', { _showMenu: false, _errorMessage: 'User invalid' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('pages/logout', { _showMenu: false });
});

app.get('/', checkSession, (req, res) => {
    res.render('pages/dashboard', { _showMenu: true, _section: 'dashboard', _session: session });
});

app.get('/list', checkSession, (req, res) => {
    res.render('pages/list', { _showMenu: true, _section: 'list', _session: session });
});

app.get('/create', checkSession, (req, res) => {
    res.render('pages/create', { _showMenu: true, _section: 'create', _session: session });
});
app.post('/create', checkSession, (req, res) => {

});

app.get('/edit/:id', checkSession, (req, res) => {
    res.render('pages/edit', { _showMenu: true, _section: 'edit', _session: session });
});
app.post('/edit', checkSession, (req, res) => {

});

app.get('/delete/:id', checkSession, (req, res) => {
    // TODO: Eliminamos de la DB
    res.render('pages/list', { _showMenu: true, _section: 'list', _successMessage: 'Se ha eliminado correctamente.' });
})

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});