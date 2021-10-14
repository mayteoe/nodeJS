const express = require('express');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const port = 8080;



app.get('/', (req, res) => {
    res.send('<h1>Server OK</h1>');
});

// Archivos estáticos
app.use('/public', express.static(__dirname + '/public'));

app.get('/image/:file', (req, res) => {
    let _start = new Date();

    // Comprobamos que el archivo original existe
    fs.stat('./public/images/' + req.params.file, (err, stats) => {

        if (err || stats.isFile() == false) {

            res.statusCode = 404;
            res.end();

        } else {

            // Redimensionamos la imagen
            let width = req.query.w || '1024';

            sharp('./public/images/' + req.params.file)
                .resize(parseInt(width))
                .toBuffer()
                .then(data => {

                    res.statusCode = 200;
                    res.end(data, 'binary');

                    let _end = new Date();
                    console.log(`Imagen generada en ${_end - _start}ms`);
                })
                .catch(err => {

                    console.log(err);
                    res.statusCode = 404;
                    res.end();

                })

        }

    });
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});
