const asincrono = function (alumnos, callback) {
    if (alumnos instanceof Array && alumnos.length > 0) {
        return callback(null, alumnos);
    } else {
        return callback(new Error(`El listado de alumnos no es un array o está vacío.`), 0);
    }
};

asincrono([`Alfonso`, `Julia`, `Ana`, `Teresa`], (err, data) => {
    if (err != null) {
        throw err;
    } else {
        console.log(`${data} son ${data.length} alumnos`);
    }
});