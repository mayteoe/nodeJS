// Contenido del middleware de log
let method = req.method || '';
let remoteAddress = req.url || '';
let userAgent = req.headers['user-agent'] || '';

let body = '';
if (method == 'POST') {
    body = JSON.stringify(req.body);
}

logFile.write(new Date().toISOString() + ` - ${method} - ${remoteAddress} - ${userAgent} - ${body}\r\n`);