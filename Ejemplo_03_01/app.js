const express = require('express');
const cities = require('cities.json');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    let obj = {};
    obj.status = 'OK';

    res.json(obj);
});

app.get('/getByCountry/:country', (req, res) => {
    let country = req.params.country;
    let response = cities.filter(city => city.country == country);
    res.json(response);
});

app.get('/getByName/:name', (req, res) => {
    let name = req.params.name;
    let response = cities.filter(city => city.name.toLowerCase().includes(name))
    res.json(response);
});

app.post('/getByName/:name', (req, res) => {
    let name = req.params.name;
    let response = cities.filter(city => city.name.toLowerCase().includes(name))
    res.json(response);
});

app.get('/getCities/:country/:name', (req, res) => {
    let name = req.params.name;
    let country = req.params.country;

    let response = cities.filter(city => city.country == country && city.name.toLowerCase().includes(name))
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});
