const express = require('express');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const port = 8080;



app.get('/', (req, res) => {
    res.send('<h1>Server OK</h1>');
});

/**
 * Opción manual de archivos estáticos
 */
//app.use('/public', express.static(__dirname + '/public'));
app.get('/public/:folder/:file', (req, res) => {

    fs.stat('./public/' + req.params.folder, (err, stats) => {

        // Si hay algún error, o el directorio no existe devolvemos 404
        if (err || stats.isDirectory() == false) {

            res.statusCode = 404;
            res.end();

        } else {

            fs.stat('./public/' + req.params.folder + '/' + req.params.file, (err, stats) => {

                if (err || stats.isFile() == false) {

                    res.statusCode = 404;
                    res.end();

                } else {

                    res.sendFile(`/public/${req.params.folder}/${req.params.file}`, { root: __dirname });

                }

            });

        }
    })
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});
