const express = require('express');
const routes = express.Router();
const teachersCreate = require('./teachers');

const teachers = require('./data.json');

routes.get('/', (req, res) => {
    return res.render("index");
});

routes.get('/teachers', (req, res) => {
    return res.render("teachers/index", { teachers: teachers.teachers });
});

routes.get('/teachers/create', (req, res) => {
    return res.render("teachers/create");
});

routes.post('/teachers', teachersCreate.post);

routes.use(function(req, res) {
    res.status(404).render("not-found");
});

module.exports = routes;