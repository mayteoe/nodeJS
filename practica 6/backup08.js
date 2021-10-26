const events =require('events');
var em =new events.EventEmitter();

module.exports.suscribe =(event, callback)=> {

    em.on(event, callback);
}





/*La manera correcta de hacerlo es con eventos*

module.exports.on(event, callback)=>{
    em.on(event, callback);
}

module.export.backup08 = () => {
    em.emit('start');
    console.log('REalizamos la copia de BBDD...');
    setTimeout(function(){
        console.log("Hrmos terminado");

    },3500)
}

module.export.backup08 = () => {
    em.emit('end');
    console.log('Iniciamlilzamos la BBDD...');
    console.log('Enviamos copia por FTP");
}