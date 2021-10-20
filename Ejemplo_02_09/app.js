const config = require('./config.js');
const http = require('http');

const hostname = config.HOST;
const port = config.PORT;
const env = config.NODE_ENV;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
    console.log(`Servidor funcionando en http://${hostname}:${port}/ trabajando en ${env}`);
});
