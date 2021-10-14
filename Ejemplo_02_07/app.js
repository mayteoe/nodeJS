const FILE = require('fs');
const READLINE = require('readline');
const file = process.argv[2];

if (file === undefined)
    throw `Error, debe indicar un archivo de entrada`;

let lines = 0;

const rl = READLINE.createInterface({
    input: FILE.createReadStream(file),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    ++lines;
    console.log(`Número total de carácteres por línea: ${line.length}`);
});

rl.on('close', () => {
    console.log(`Número total de líneas: ${lines}`);
});