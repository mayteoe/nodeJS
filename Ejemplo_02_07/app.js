const fs = require('fs');
const READLINE = require('readline');
const file = process.argv[2];

if (file === undefined)
    throw `Error, debe indicar un archivo de entrada`;

// Creamos un archivo de log
let log = fs.createWriteStream('./output.log', { flags: 'w' });

const rl = READLINE.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    log.write(new Date().toISOString() + ' - ' + line + '\t|\t[' + line.length + ' caracteres]\r\n');
});

rl.on('close', () => {
    log.close();
});