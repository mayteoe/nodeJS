const events = require('events');
var em = new events.EventEmitter();

module.exports.subscribe = (event, callback) => {
    em.on(event, callback);
}

module.exports.backupDB = (date) => {
    em.emit('start');
    console.log('Realizamos la copia de la BD...');

    setTimeout(function () {
        console.log('Copia de BD realizada...');
        em.emit('end');
    }, 3500);
}