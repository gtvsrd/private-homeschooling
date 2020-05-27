//create
const fs = require('fs');
const data = require('../data.json');
const { age, date, grade } = require('../utils');

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for( key of keys ) {
        if(req.body[key] == "") {
            return res.send("Please fill all the fields");
        }
    }

    birth = Date.parse(req.body.birth);
    let schoolYear = grade(req.body.schoolYear);

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if(lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        ...req.body,
        id,
        birth,
        schoolYear,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error");
    
        return res.redirect("/students");
    });

    //return res.send(req.body);
}

exports.create = (req, res) => {
    return res.render("students/create");
}

exports.show = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent) return res.send("Student not found");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
    }

    return res.render("students/show", { student });
}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent) return res.send("Student not found");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
    }

    return res.render('students/edit', { student }); 
}

exports.put = (req, res) => {
    const { id } = req.body;

    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex){
        if(student.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if(!foundStudent) return res.send("Student not found");

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error");
    
        return res.redirect(`/students/${id}`);
    });
}

exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student){
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error");
    
        return res.redirect("/students");
    });
}

exports.index = (req, res) => {
    return res.render("students/index", { students: data.students });
}