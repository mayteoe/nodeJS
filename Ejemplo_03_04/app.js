const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Ejemplo Web' });
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});