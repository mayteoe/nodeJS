
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    // Analizamos la URL
    switch (req.url) {
        case '/':
            _getIndex(res);
            break;
        case '/post':
            _getPost(req, res);
            break;
        default:
            _getNoRoute(res);
            break;
    }
});

function _getNoRoute(res) {
    res.writeHeader(404, { "Content-Type": "text/html" });
    res.write(`<h1>Route not found</h1>`);
    res.end();
}

function _getIndex(res) {
    fs.readFile('./public/index.html', function (err, html) {
        if (err) {
            res.writeHeader(404, { "Content-Type": "text/html" });
            res.write(`<h1>File not found</h1><small>${err}</small>`);
            res.end();
        }

        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
    });
}

function _getPost(req, res) {
    const chunks = [];

    // Obtenemos el payload de la petición (todos los datos POST)
    req.on('data', (chunk) => {
        chunks.push(chunk);
    });
    req.on('end', () => {
        const data = Buffer.concat(chunks);
        console.log(data.toString());

        const output = qs.parse(data.toString());
        let name = output.name;
        let email = output.email;

        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(`<h1>Hemos recibido el formulario</h1><p>Nombre:<b>${name}</b></p><p>Email: <b>${email}</b></p>`);
        res.end();
    });
}


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});