const moduloBackupDB = require('./moduloBackupDB');

moduloBackupDB.subscribe('start', function () {
    console.log('Paramos la BD');
});
moduloBackupDB.subscribe('end', function () {
    console.log('Subimos la copia por FTP.');
    console.log('Iniciamos la BD');
});

moduloBackupDB.backupDB();