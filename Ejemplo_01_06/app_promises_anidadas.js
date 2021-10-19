const asinc = function (alumnos) {
    let promise = new Promise((resolve, reject) => {

        if (alumnos instanceof Array && alumnos.length > 0) {
            resolve(alumnos);
        } else {
            reject(new Error(`El listado de alumnos no es un array o está vacío.`));
        }

    });

    return promise;
}

asinc([`Alfonso`, `Julia`, `Ana`, `Aitor`])
    .then((data) => {
        return asinc(data);
    })
    .then((data) => {
        return asinc(data);
    })
    .then((data) => {
        return asinc([]);
    })
    .then((data) => {
        return asinc(data);
    })
    .then((data) => {
        console.log(`${data} son ${data.length} alumnos`);
    })
    .catch((err) => {
        console.log(err);
    });