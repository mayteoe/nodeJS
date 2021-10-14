const express = require('express');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const app = express();
const port = 8080;



app.get('/', (req, res) => {
    res.send('<h1>Server OK</h1>');
});

// Archivos estáticos
app.use('/public', express.static(__dirname + '/public'));

app.get('/image/:file', (req, res) => {
    let _start = new Date();
    let _fileName = path.parse(req.params.file).name;
    let _fileExtension = path.parse(req.params.file).ext;
    let _width = req.query.w || '1024';

    // Comprobamos si el archivo está en la cache, y lo devovemos
    fs.stat(`./cache/${_fileName}_${_width}${_fileExtension}`, (err, stats) => {

        if (err == null && stats.isFile() === true) {

            res.sendFile(`./cache/${_fileName}_${_width}${_fileExtension}`, { root: __dirname });
            let _end = new Date();
            console.log(`Imagen cacheada en ${_end - _start}ms`);

        } else {

            // Comprobamos que el archivo original existe
            fs.stat('./public/images/' + req.params.file, (err, stats) => {

                if (err || stats.isFile() == false) {

                    res.statusCode = 404;
                    res.end();

                } else {

                    // Redimensionamos la imagen
                    sharp('./public/images/' + req.params.file)
                        .resize(parseInt(_width))
                        .toFile(`./cache/${_fileName}_${_width}${_fileExtension}`)
                        .then(data => {

                            res.sendFile(`./cache/${_fileName}_${_width}${_fileExtension}`, { root: __dirname });

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
        }

    });
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});
