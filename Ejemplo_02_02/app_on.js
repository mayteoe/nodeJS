process.on(`exit`, function () {
    console.log(`TODO: Enviamos un email al administrador informando de la parada de la aplicación.`);
});

process.on(`uncaughtException`, function (err) {
    console.log(`TODO: Enviamos un email al administrador informando del error.`);
    console.log(err);
});

console.log(`Hemos recibido ${process.argv.length} argumentos`);
throw new Error(`Error inesperado durante la ejecución`);

console.log(process.argv);