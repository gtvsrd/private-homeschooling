const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');

const data = require('./data.json');

routes.get('/', (req, res) => {
    return res.render("index");
});

routes.get('/teachers', (req, res) => {
    return res.render("teachers/index", { teachers: data.teachers });
});

routes.get('/teachers/create', (req, res) => {
    return res.render("teachers/create");
});

routes.get('/teachers/:id', teachers.show);

routes.get('/teachers/:id/edit', teachers.edit);

routes.post('/teachers', teachers.post);

routes.use(function(req, res) {
    res.status(404).render("not-found");
});

module.exports = routes;