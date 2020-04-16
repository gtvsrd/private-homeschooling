const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.render("index");
});

routes.get('/teachers', (req, res) => {
    return res.render("teachers/index");
});

routes.use(function(req, res) {
    res.status(404).render("not-found");
});

module.exports = routes;