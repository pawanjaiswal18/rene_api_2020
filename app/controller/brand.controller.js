const db = require('../config/db.config.js');
const Brand = db.tbl_brand;
const { photoPath } = require('../config/Global');
const fs = require('fs');
// Post a Category
exports.create = (req, res) => {
	if (req.file == undefined) {
		Brand.create({
			brandNameMM: req.body.brandNameMM,
			brandNameEg: req.body.brandNameEg,
			description: req.body.description,
			active: req.body.active,
			creationUser:req.body.creationUser,
			brandImage: 'default-image.jpg',

		}).then(brand => {

			res.send(brand);
		});
	}
	else {
		Brand.create({
			brandNameMM: req.body.brandNameMM,
			brandNameEg: req.body.brandNameEg,
			description: req.body.description,
			creationUser:req.body.creationUser,
			active: req.body.active,
			brandImage: req.file.filename,

		}).then(brand => {

			res.send(brand);
		});
	}
};

exports.findAllByActive = (req, res) => {
	Brand.findAll({
		where: {
			active: true
		}
	}
	).then(brand => {
		res.send(brand);
	});
}

// show photo path
exports.getPhotoPath = (req, res) => {
    const fileName = req.params.fileName;
    console.log(fileName)
	const mimeType = fileName.split('.')[1];
	console.log(fileName);
	var staticResource = photoPath + fileName;
	fs.readFile(staticResource, (err, data) => {
		if (err) {
			console.log("Can't read file");
		}
		res.writeHead(200, { 'Content-Type': mimeType });
		res.end(data)
	});

};
// FETCH all Category
exports.findAll = (req, res) => {
	Brand.findAll().then(brand => {

		res.send(brand);
	});
};
// Update a Category
exports.update = (req, res) => {
	const id = req.params.brandId;
	if (req.file == undefined) {
		Brand.update({ brandNameMM: req.body.brandNameMM, brandNameEg: req.body.brandNameEg, description: req.body.description, active: req.body.active, updatedUser:req.body.updatedUser },
			{ where: { id: id} }
		).then(() => {
			res.status(200).send("updated successfully a brand with id = " + id);
		});
	}
	else {
		Brand.update({ brandNameMM: req.body.brandNameMM, brandNameEg: req.body.brandNameEg, brandImage: req.file.filename, description: req.body.description, active: req.body.active,updatedUser:req.body.updatedUser },
			{ where: { id: id } }
		).then(() => {
			res.status(200).send("updated successfully a brand with id = " + id);
		});
	}

};

