const db = require('../config/db.config.js');
const fs = require('fs');
const  path  = require('../config/Global');

var crypto = require('crypto');
const AdminUser = db.tbl_adminuser;

exports.create = (req, res) => {

    var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    if (req.file == undefined) {
        AdminUser.create({
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hash,
            gender: req.body.gender,
            active: req.body.active,
            creationUser: req.body.creationUser,
            profileImage: 'default-image.jpg',

        }).then(user => {

            res.send(user);
        });

    }
    else {
        AdminUser.create({
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hash,
            gender: req.body.gender,
            active: req.body.active,
            creationUser: req.body.creationUser,
            profileImage: req.file.filename,

        }).then(user => {

            res.send(user);
        });
    }


};


// show photo path
exports.getPhotoPath = (req, res) => {
    const fileName = req.params.fileName;
  
    const mimeType = fileName.split('.')[1];
    var staticResource = path.adminPhotoPath + fileName;
    console.log(staticResource)
    fs.readFile(staticResource, (err, data) => {
        if (err) {
            console.log("Can't read file");
        }
        console.log(data)
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data)
    });

};

//check Account 
exports.check = (req, res) => {
    const userName = req.params.userName;
    var hash = crypto.createHash('md5').update(req.params.password).digest('hex');

    AdminUser.find(
        { where: { userName: userName, password: hash } }
    ).then(acc => {
        if (acc != null) {

            res.send(acc.userName);
        }
        else {

            res.send('wrong');
        }

    });
};

// FETCH all Admin Users
exports.findAll = (req, res) => {
    AdminUser.findAll().then(admin => {

        res.send(admin);
    });
};

//Update Admin User With Image
exports.updateAdmin = (req, res) => {
    const id = req.params.adminId;
    if (req.file == undefined) {
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        AdminUser.update({
            userName: req.body.userName, email: req.body.email, phone: req.body.email,
            address: req.body.address, password: hash, phone: req.body.phone, gender: req.body.gender, active: req.body.active, updatedUser: req.body.updatedUser
        },

            { where: { id: req.params.adminId } }
        ).then(() => {
            res.status(200).send("updated successfully a admin with id = " + id);
        });

    }
    else {
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        AdminUser.update({
            userName: req.body.userName, email: req.body.email, phone: req.body.email,
            address: req.body.address, password: hash, gender: req.body.gender, active: req.body.active, profileImage: req.file.filename, updatedUser: req.body.updatedUser
        },

            { where: { id: req.params.adminId } }
        ).then(() => {
            res.status(200).send("updated successfully a admin with id = " + id);
        });

    }
};




