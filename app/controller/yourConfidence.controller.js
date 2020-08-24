const db = require('../config/db.config.js');
const YCgallery = db.tbl_your_confidence;
const sequelize = db.sequelize;
const  path  = require('../config/Global');
const fs = require('fs');

// Post a YCgallery
exports.create = (req, res) => {

    if (req.file == undefined) {

        YCgallery.create({
            modelName: req.body.modelName,
            modelImage: 'default-image.jpg',

        }).then(ycgallery => {

            res.send(ycgallery);
    });
}
else {
    YCgallery.create({
        modelName: req.body.modelName,
        modelImage: req.file.filename,

    }).then(ycgallery => {

        res.send(ycgallery);
});
}
};


// show photo path
exports.getPhotoPath = (req, res) => {
    const fileName = req.params.fileName;
    const mimeType = fileName.split('.')[1];

    var staticResource = path.yourConfidencePhotoPath + fileName;
    console.log(fileName)
    console.log(mimeType)
    console.log(staticResource)

    fs.readFile(staticResource, (err, data) => {
        if (err) {
        console.log("Can't read file");
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data)
});

};


// Update a Category
exports.update = (req, res) => {

    const id = req.params.ycgalleryId;
    if (req.file == undefined) {
        YCgallery.update({ modelName: req.body.modelName},
            { where: { id: req.params.ycgalleryId } }
        ).then(() => {
            res.status(200).send("updated successfully a category with id = " + id);
    });
}
else {
    YCgallery.update({ modelName: req.body.modelName,modelImage: req.file.filename},
        { where: { id: req.params.ycgalleryId } }
    ).then(() => {
        res.status(200).send("updated successfully a category with id = " + id);
});
}

};

exports.getAll = (req, res) => {
    let query = `SELECT * FROM tbl_your_confidence `;

    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {

        res.send(list)
})
};