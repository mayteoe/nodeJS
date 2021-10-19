const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    // Analizamos la URL
    switch (req.url) {
        case '/':
            _getIndex()
                .then((data) => {
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(data);
                    res.end();
                })
                .catch((data) => {
                    res.writeHeader(404, { "Content-Type": "text/html" });
                    res.write(data);
                    res.end();
                });
            break;
        default:
            _getNotFound().then((data) => {
                res.writeHeader(404, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            });
    }
});

function _getIndex() {

    return new Promise((resolve, reject) => {
        fs.readFile('./public/index.html', function (err, html) {
            if (err) {
                reject(`<h1>File not found</h1><small>${err}</small>`);
            }

            resolve(html);
        })
    });
}

function _getNotFound() {
    return new Promise((resolve, reject) => {
        resolve(`<h1>Route not found</h1>`);
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});