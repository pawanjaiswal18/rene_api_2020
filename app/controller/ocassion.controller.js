const db = require('../config/db.config.js');
const Ocassion = db.tbl_ocassion;
const sequelize = db.sequelize;
const  path  = require('../config/Global');
const fs = require('fs');
// Post a Ocassion
exports.create = (req, res) => {

    if (req.file == undefined) {

        Ocassion.create({
            ocassionName: req.body.ocassionName,
            description: req.body.description,
            active: req.body.active,
            isHomeDisplay:req.body.isHomeDisplay,
            creationUser:req.body.creationUser,
            ocassionImage: 'default-image.jpg',

        }).then(ocassion => {

            res.send(ocassion);
    });
}
else {
    Ocassion.create({
        ocassionName: req.body.ocassionName,
        description: req.body.description,
        creationUser:req.body.creationUser,
        active: req.body.active,
        isHomeDisplay:req.body.isHomeDisplay,
        ocassionImage: req.file.filename,

    }).then(ocassion => {

        res.send(ocassion);
});
}
};

exports.findAllByActive = (req, res) => {
    let query = `SELECT id as value, ocassionName as label ,ocassionImage as banner FROM tbl_ocassion where active = true `;

    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
        res.send(list)
})
}

// show photo path
exports.getPhotoPath = (req, res) => {
    const fileName = req.params.fileName;
    const mimeType = fileName.split('.')[1];

    var staticResource = path.ocassionPhotoPath + fileName;

    fs.readFile(staticResource, (err, data) => {
        if (err) {
        console.log("Can't read file");
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data)
});

};
// FETCH all Ocassion
exports.findAll = (req, res) =>{
    let query = `SELECT * FROM tbl_ocassion`;

    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {

        res.send(list)
})
};
// Update a Ocassion
exports.update = (req, res) => {

    const id = req.params.ocassionId;
    if (req.file == undefined) {
        Ocassion.update({ ocassionName: req.body.ocassionName, description: req.body.description, active: req.body.active,isHomeDisplay:req.body.isHomeDisplay, updatedUser:req.body.updatedUser },
            { where: { id: req.params.ocassionId } }
        ).then(() => {
            res.status(200).send("updated successfully a ocassion with id = " + id);
    });
}
else {
    Ocassion.update({ ocassionName: req.body.ocassionName,ocassionImage: req.file.filename, description: req.body.description,isHomeDisplay:req.body.isHomeDisplay, active: req.body.active,updatedUser:req.body.updatedUser },
        { where: { id: req.params.ocassionId } }
    ).then(() => {
        res.status(200).send("updated successfully a ocassion with id = " + id);
});
}

};
exports.findAllOcassion = (req, res) => {
    let query = `SELECT id as value , ocassionName as label FROM tbl_ocassion where active = true `;

    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {

        res.send(list)
    console.log(list)
})
};

