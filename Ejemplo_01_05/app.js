let count_limit = 100000;

window.addEventListener("DOMContentLoaded", (event) => {
    initJS();
});

function initJS() {
    console.log(new Date().toJSON() + " - " + "DOM cargado");

    // Evento
    let btn = document.getElementById("btn");
    btn.addEventListener("click", miPromesa);
}

function promiseTest() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("Termino correctamente la promesa");
            //reject("Fallo la promesa");
        }, 2500);
    });
}

function miPromesa() {
    console.log(new Date().toJSON() + " - " + "Empezamos con una promesa");

    promiseTest().then((successMessage) => {
        console.log(new Date().toJSON() + " - " + successMessage);
    }).catch((err) => {
        console.log(new Date().toJSON() + " - Fallo:" + err);
    });

    console.log(new Date().toJSON() + " - " + "Seguimos trabajando, la promesa ya terminará...");
    console.log(new Date().toJSON() + " - " + "Hacemos una tarea sincrona");

    for (i = 0; i < count_limit; i++) {
        let test = "";
        //console.log("Hemos contado hasta " + count_limit + ".");
    }

    console.log(new Date().toJSON() + " - " + "Hemos terminado la tarea sincrona");
}

