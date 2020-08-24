const db = require('../config/db.config.js');
const Campaign = db.tbl_campaign;
const fs = require('fs');
const sequelize = db.sequelize;
const  path  = require('../config/Global');
// Post a Campaign
exports.create = (req, res) => {
	// Save to MySQL database
	if (req.file == undefined) {
		Campaign.create({
			campaignName: req.body.campaignName,
			headerLine1: req.body.headerLine1,
			headerLine2: req.body.headerLine2,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			bannerImage: 'default-image.jpg',
			creationUser:req.body.creationUser,
			description: req.body.description,
			active: req.body.active
		}).then(campaign => {

			res.send(campaign);
		});
	}
	else {
		Campaign.create({
			campaignName: req.body.campaignName,
			headerLine1: req.body.headerLine1,
			headerLine2: req.body.headerLine2,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			bannerImage: req.file.filename,
			creationUser:req.body.creationUser,
			description: req.body.description,
			active: req.body.active
		}).then(campaign => {

			res.send(campaign);
		});

	}

};

// show photo path
exports.getPhotoPath = (req, res) => {
	const fileName = req.params.fileName;
	const mimeType = fileName.split('.')[1];
	console.log(mimeType);
	var staticResource = path.upload + fileName;
	fs.readFile(staticResource, (err, data) => {
		if (err) {
			console.log("Can't read file");
		}
		res.writeHead(200, { 'Content-Type': mimeType });
		res.end(data)
	});

};


exports.findAllByActive = (req, res) => {
	Campaign.findAll({
		where: {
			active: true
		}
	}
	).then(campaign => {
		res.send(campaign);
	});
}


// FETCH all Supplier
exports.findAll = (req, res) => {
	Campaign.findAll().then(campaign => {

		res.send(campaign);
	});
};
exports.findCampaignSelect = (req, res) => {
	let query = `SELECT id as value , campaignName as label FROM tbl_campaign
	 where active = true `; 
	
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
			
            res.send(list)
        })
}


// Update a Supplier
exports.update = (req, res) => {
	const id = req.params.campaignId;
	
	if (req.file == undefined) {
		Campaign.update({ campaignName: req.body.campaignName, headerLine1: req.body.headerLine1, headerLine2: req.body.headerLine2, startDate: req.body.startDate, endDate: req.body.endDate, description: req.body.description, active: req.body.active ,updatedUser:req.body.updatedUser},
			{ where: { id: req.params.campaignId } }
		).then(() => {
			res.status(200).send("updated successfully a campaign with id = " + id);
		});
	}
	else {
		Campaign.update({ campaignName: req.body.campaignName, headerLine1: req.body.headerLine1, headerLine2: req.body.headerLine2, startDate: req.body.startDate, endDate: req.body.endDate, description: req.body.description, active: req.body.active, bannerImage: req.file.filename,updatedUser:req.body.updatedUser },
			{ where: { id: req.params.campaignId } }
		).then(() => {
			res.status(200).send("updated successfully a campaign with id = " + id);
		});
	}

};

