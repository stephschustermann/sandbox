const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'bluelime',
    host: 'localhost',
    database: 'api',
    password: 'gratitude',
    port: 5432,
});

const getCountries = (req, res) => {
    pool.query('SELECT * FROM countries ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows);
    })
}

const getCountryById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM countries WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows);
    })
}

const createCountry = (req, res) => {
    const { name, capital } = req.body;
    pool.query('INSERT INTO countries (name, capital) values ($1, $2)', [name, capital], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(201).send('A new country has been added to the database');
    })
}

const updateCountry = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, capital } = req.body;
    pool.query('UPDATE countries SET name = $1, capital = $2 WHERE id = $3', [name, capital, id], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send('Country has been updated in the database');
    })
}

const deleteCountry = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM countries WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`country deleted wth id ${id}`);
    })
}

module.exports = {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
}
