const moduloBackup08 =require ('./backup08');

moduloBackup08.suscribe('start', function{

    console.log('Parar la bdd');
})

moduloBackup08.suscribe('end', function(){
    console.log('Enviamos la copia por FTP')
});

moduloBackup08.on ('start' , function() {

    console.log('Parar la BBDD');
})

moduloBackup08.on('end', function(){

    console.log('Iniciamos la BBDD');

})