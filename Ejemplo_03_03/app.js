const express = require('express');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Respuesta de prueba</h1>');
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});