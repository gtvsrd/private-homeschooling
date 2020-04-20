//create
const fs = require('fs');
const data = require('./data.json');

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