
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./queries');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json( { Welcome: 'How to create API with Node.js, Express and PostgreSQL' });
});

app.get('/countries', db.getCountries);
app.get('/countries/:id', db.getCountryById);
app.post('/countries', db.createCountry);
app.put('/countries/:id', db.updateCountry);
app.delete('/countries/:id', db.deleteCountry);

app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`);
});
