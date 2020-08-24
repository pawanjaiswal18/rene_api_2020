const db = require('../config/db.config.js');
const Classs = db.tbl_classs;
const sequelize = db.sequelize;
const  path  = require('../config/Global');
const fs = require('fs');
// Post a Classs
exports.create = (req, res) => {

    if (req.file == undefined) {

        Classs.create({
            classsName: req.body.classsName,
            description: req.body.description,
            active: req.body.active,
            creationUser:req.body.creationUser,

        }).then(classs => {

            res.send(classs);
    });
}
else {
    Classs.create({
        classsName: req.body.classsName,
        description: req.body.description,
        creationUser:req.body.creationUser,
        active: req.body.active,

    }).then(classs => {

        res.send(classs);
});
}
};

exports.findAllByActive = (req, res) => {
    let query = `SELECT id as value, classsName as label FROM tbl_classs where active = true `;

    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
        res.send(list)
})
}


// FETCH all Classs
exports.findAll = (req, res) => {
    Classs.findAll().then(classs => {

        res.send(classs);
});
};
// Update a Classs
exports.update = (req, res) => {

    const id = req.params.classsId;
    if (req.file == undefined) {
        Classs.update({ classsName: req.body.classsName, description: req.body.description, active: req.body.active, updatedUser:req.body.updatedUser },
            { where: { id: req.params.classsId } }
        ).then(() => {
            res.status(200).send("updated successfully a classs with id = " + id);
    });
}
else {
    Classs.update({ classsName: req.body.classsName, description: req.body.description, active: req.body.active,updatedUser:req.body.updatedUser },
        { where: { id: req.params.classsId } }
    ).then(() => {
        res.status(200).send("updated successfully a classs with id = " + id);
});
}

};
