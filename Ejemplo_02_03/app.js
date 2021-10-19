const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname

    switch (pathname) {
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hola Mundo');
            break;
        case '/about':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('About');
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not found');
            break;

    }
});
/*
server.on(`error`, function (e) {
    console.log(`Error`);
});
*/
server.listen(port, hostname, () => {
    console.log(`Servidor funcionando en http://${hostname}:${port}/`);
});