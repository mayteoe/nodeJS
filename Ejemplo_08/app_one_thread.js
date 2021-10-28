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
            let num = 42;
            let result = fibo(num);
            console.log(`[main] obtenemos fibo de ${num}: ${result}`)
        }

        _end = new Date();
    }
}

function fibo(n) {
    if (n < 2)
        return 1;
    else
        return fibo(n - 2) + fibo(n - 1);
}

init();
process.stdin.resume();







