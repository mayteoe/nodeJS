const wt = require("worker_threads");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    let _start = new Date();
    let _end = new Date();
    for (i = 1; i < 11; i++) {

        console.log(`[main] vamos realizando tareas ${i} ${_end - _start}ms`);
        await sleep(1000);


        if (i == 20) {
            const worker = new wt.Worker('./thread.js');
            let _initThread = new Date();
            worker.postMessage(42); //

            worker.on('message', result => {
                let _endThread = new Date();
                console.log(`[thread] Ya han calculado fibo: ${result} en ${_endThread - _initThread}ms`);
            });

            worker.on('exit', exitCode => {
                console.log('[thread] Terminamos el hilo');
            })
        }

        _end = new Date();
    }
}

init();
process.stdin.resume();







