const wt = require('worker_threads');
const parentPort = wt.parentPort;

parentPort.on('message', function (num) {
    console.log('[thread] Iniciamos el proceso...');
    let _fibo = fibo(num);
    parentPort.postMessage(_fibo);
    process.exit();
})

function fibo(n) {
    if (n < 2)
        return 1;
    else
        return fibo(n - 2) + fibo(n - 1);
}