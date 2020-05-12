//create
const fs = require('fs');
const data = require('./data.json');
const { age, date, graduation } = require('./utils');

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for( key of keys ) {
        if(req.body[key] == "") {
            return res.send("Please fill all the fields");
        }
    }

    let {avatar_url, name, birth, grade, type, services} = req.body;

    birth = Date.parse(req.body.birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url, 
        name, 
        birth, 
        grade,
        type, 
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error");
    
        return res.redirect("/teachers");
    });

    //return res.send(req.body);
}

exports.show = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher) return res.send("Teacher not found");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        grade: graduation(foundTeacher.grade),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher });
}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher) return res.send("Teacher not found");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    }

    return res.render('teachers/edit', { teacher }); 
}

exports.put = (req, res) => {
    const { id } = req.body;

    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(teacher.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if(!foundTeacher) return res.send("Teacher not found");

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error");
    
        return res.redirect(`/teachers/${id}`);
    });
}

exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error");
    
        return res.redirect("/teachers");
    });
}