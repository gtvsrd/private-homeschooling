const Student = require('../models/Student');
const { age, date } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Student.all(function(students) {
            return res.render("students/index", { students });
        });
    },

    create(req, res) {
        return res.render("students/create");
    },

    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!"); 

            student.age = age(student.birth);

            return res.render("students/show", { student });
        });
    },

    post(req, res) {
        const keys = Object.keys(req.body);
    
        for( key of keys ) {
            if(req.body[key] == "") {
                return res.send("Please fill all the fields");
            }
        }
    
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`);
        });
    },

    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!"); 

            student.birth = date(student.birth).iso;

            return res.render("students/edit", { student });
        });
    },
    
    put(req, res) {
        const keys = Object.keys(req.body);
    
        for( key of keys ) {
            if(req.body[key] == "") {
                return res.send("Please fill all the fields");
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`);
        });
    },
    
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`);
        });
    }
}











