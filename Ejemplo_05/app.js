const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bp = require('body-parser')
const path = require('path');

const app = express();
const port = 8080;

// Contectamos con la DB
let db = new sqlite3.Database('./sample.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {

    // Si no podemos conectar, creamos la DB
    if (err) {
        console.error(err.message);
    } else {
        _initDB();
        console.log('Connected to the sample database.');
    }
});

function _initDB() {
    db.prepare(`CREATE TABLE IF NOT EXISTS "clients"  (
        "id"	INTEGER,
        "name"	TEXT NOT NULL,
        "email"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    );`).run().finalize();

    app.listen(port, () => {
        console.log(`Server listening in ${port}`);
    });
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bp.urlencoded());

app.get('/', (req, res) => {
    // Obtenemos los valores de la DB
    db.all(`SELECT * FROM "clients";`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let values = rows;
        res.render('index', { title: 'CRUD Sample', values: values });
    });
});

app.get('/create', (req, res) => {
    res.render('create', { title: 'CRUD Sample - Create client' });
});

app.post('/create', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    db.prepare(`INSERT INTO "clients" ('name', 'email') VALUES ('${name}', '${email}');`).run().finalize();

    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    if (Number.isInteger(parseInt(id))) {
        // Obtenemos los valores de la DB
        db.all(`DELETE FROM "clients" WHERE id=$id;`, { $id: parseInt(id) }, (err, rows) => {
            if (err) {
                throw err;
            }

            res.redirect('/');
        });
    }
});

app.get('/update/:id', (req, res) => {
    let id = req.params.id;

    if (Number.isInteger(parseInt(id))) {
        // Obtenemos los valores de la DB
        db.all(`SELECT * FROM "clients" WHERE id=$id LIMIT 1;`, { $id: parseInt(id) }, (err, rows) => {
            if (err) {
                throw err;
            }
            if (rows.length == 0) {
                res.redirect('/');
            } else {
                let value = rows[0];
                res.render('edit', { title: 'CRUD Sample - Edit client', value: value });
            }
        });
    }
});

app.post('/update/:id', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;

    if (Number.isInteger(parseInt(id))) {
        db.prepare(`UPDATE "clients" SET name='${name}', 'email'='${email}' WHERE id=${parseInt(id)};`).run().finalize();
    }

    res.redirect('/');
});
