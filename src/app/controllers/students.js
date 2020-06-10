const { age, date, grade } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        return res.render("students/index");
    },

    create(req, res) {
        return res.render("students/create");
    },

    show(req, res) {
        return
    },

    post(req, res) {
        const keys = Object.keys(req.body);
    
        for( key of keys ) {
            if(req.body[key] == "") {
                return res.send("Please fill all the fields");
            }
        }
    
        return
    },

    edit(req, res) {
        return
    },
    
    put(req, res) {
        const keys = Object.keys(req.body);
    
        for( key of keys ) {
            if(req.body[key] == "") {
                return res.send("Please fill all the fields");
            }
        }
        
        return
    },
    
    delete(req, res) {
        return
    }
}








