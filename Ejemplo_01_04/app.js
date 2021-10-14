console.log(`Iniciamos la aplicación`);

let despedirse = function (nombre) {
    console.log(`Adios ${nombre}`);
}

function saludar(nombre, callback) {
    console.log(`Buenos días ${nombre}`);

    setTimeout(function () { callback(nombre) }, 250);
}

saludar(`Alfonso`, despedirse);
console.log(`Aquí continuamos con la aplicación`);
