const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;
const logFile = fs.createWriteStream('./output.log', { flags: 'a' });

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    logFile.write(`Recibimos una petición ${req.method}\r\n`);
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>Respuesta de prueba de vuelta</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>Estamos en about</h1>');
});

app.get('/info/:parameter', (req, res) => {
    res.send(`<h1>Recibimos ${req.params.parameter}</h1>`);
});

app.post('/post', (req, res) => {
    let name = req.body.name;
    res.send(`<h1>Recibimos name: ${name}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});