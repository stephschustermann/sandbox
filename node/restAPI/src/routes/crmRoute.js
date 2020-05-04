const routes = (app) => {
    app.route('/')
    .get((req, res) => {
        res.send(`this is the get method `)
    })
    .post((req, res) => {
        res.send(`this is the post method`)
    })
    .put((req, res) => {
        res.send(`this is the put method`)
    })
    .delete((req, res) => {
        res.send(`this is the delete method`)
    })
}

module.exports = routes;