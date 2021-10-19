
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const initial_date = new Date();

const server = http.createServer((req, res) => {

    if (req.method == 'GET') {
        switch (req.url) {
            case '/info':
                {
                    let response = {};
                    response.server = 'NodeJS';
                    response.version = '14.18.0';
                    response.date = new Date().toISOString();

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                }
                break;
            case '/status':
                {
                    let response = {};
                    response.status = true;
                    response.started_at = initial_date.toISOString();

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                }
                break;

            default:
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>Not found</h1>');
                break;
        }
    } else if (req.method == 'POST') {
        switch (req.url) {
            case '/save':
                {
                    let response = {};
                    response.status = true;

                    console.log(`Recibimos una petición POST a las ${new Date().toISOString()}`);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                }
                break;

            default:
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>Not found</h1>');
                break;
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Not found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});