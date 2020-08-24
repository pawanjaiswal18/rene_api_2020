const db = require('../config/db.config.js');
const multer = require('multer');
const fs = require('fs');
const { photoPath, itemPhotoPath } = require('../config/Global');
const Item = db.tbl_item;
const Photo = db.tbl_itemphoto;
const matchOutfitItem = db.tbl_matchoutfititem;
const sequelize = db.sequelize;
var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, itemPhotoPath);// this is location to save your destination file in to server
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname)
	}
});
var upload = multer({ storage: storage }).array('uploadfile', 8);

// Post a Item
exports.create = (req, res) => {

	upload(req, res, function (err) {
		if (err) {
			console.log(err);
			return;
		}
		var fileLength = req.files.length;
		var outfitItem = JSON.parse(req.body.matchItem)
	
		//Save to MySQL database
		Item.create({
			itemName: req.body.itemName,
			shortName: req.body.shortName,
			shortNote: req.body.shortNote,
			description: req.body.description,
			categoryId: req.body.category,
			ocassionId: req.body.ocassion,
			isHomeDisplay:req.body.isHomeDisplay,
			isNewArrival:req.body.isNewArrival,
			isPromotion:req.body.isPromotion,
			isBestSelling:req.body.isBestSelling,
			creationUser: req.body.creationUser,
			active: req.body.active
		}).then(item => {
			var id = item.id;
			res.send(item);
			for (var i = 0; i < fileLength; i++) {
				Photo.create({
					itemId: id,
					photoName: req.files[i].filename
				})
			}
		
			for (var j = 0; j< outfitItem.length; j++) {
				
				matchOutfitItem.create({
					itemId:id,
					matchItemId: outfitItem[j].itemId
				})
			}
		});
	});

};


// Update a Item
exports.update = (req, res) => {
	const itemId = req.params.itemId
	upload(req, res, function (err) {
		var remainImage = JSON.parse(req.body.remainImage);
		var matchItem =JSON.parse(req.body.matchItem);
		matchOutfitItem.destroy({
			where: { itemId: itemId }
		}).then(() => {
			for (var m = 0; m < matchItem.length; m++) {
				matchOutfitItem.create({
					itemId: itemId,
					matchItemId: matchItem[m].itemId
				})
			}
		});
		if (remainImage.length > 0) {
			Photo.findAll({
				where: { itemId: itemId }
			}).then(image => {
				if (remainImage.length !== image.length) {
					Photo.destroy({
						where: { itemId: itemId }
					}).then(() => {
						for (var m = 0; m < remainImage.length; m++) {
							Photo.create({
								itemId: itemId,
								photoName: remainImage[m].photoName
							})
						}
					});
				}
				else {
					console.log("remain");
				}
			})
		}
		if (req.files.length == 0) {
			Item.update({
				itemName: req.body.itemName,ocassionId: req.body.ocassion,
					itemNameMM: req.body.itemNameMM, shortName: req.body.shortName, description: req.body.description,
				itemDescription: req.body.itemDescription,
				isHomeDisplay:req.body.isHomeDisplay,
			isNewArrival:req.body.isNewArrival,
			isPromotion:req.body.isPromotion,
			isBestSelling:req.body.isBestSelling,
				shortNote: req.body.shortNote, category: req.body.category,
				updatedUser: req.body.updatedUser, active: req.body.active
			},
				{ where: { id: itemId } }
			).then(() => {
				res.status(200).send("updated successfully");
			});
		}
		else {

			var fileLength = req.files.length;
			// Save to MySQL database
			Item.update({
				itemName: req.body.itemName,ocassionId: req.body.ocassion, itemNameMM: req.body.itemNameMM, shortName: req.body.shortName, description: req.body.description,
				itemDescription: req.body.itemDescription,
				isHomeDisplay:req.body.isHomeDisplay,
			isNewArrival:req.body.isNewArrival,
			isPromotion:req.body.isPromotion,
			isBestSelling:req.body.isBestSelling,
				shortNote: req.body.shortNote, category: req.body.category,
				updatedUser: req.body.updatedUser, active: req.body.active
			},
				{ where: { id: itemId } }
			).then(item => {
				for (var i = 0; i < fileLength; i++) {
					Photo.create({
						itemId: itemId,
						photoName: req.files[i].filename
					})
				}
				res.status(200).send("updated successfully");
			});
		}
	});
};

// FETCH ocassion  Item

exports.findByOcassion =async (req,res)=> {
	let price = '';
	let item = []

	let itemQuery =`SELECT * FROM tbl_item where ocassionId = `+ req.params.id;

	item = await sequelize.query(itemQuery, {
		type: sequelize.QueryTypes.SELECT
	});
	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery= `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone = await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo= await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}
	res.send(item)


}

// FETCH all Item

exports.findAll = (req, res) => {
	let query = `SELECT a.id, itemName, shortName,shortNote,a.description,
		a.categoryId, a.active, b.subCategoryName
	FROM tbl_item as a inner join tbl_subcategory as b on a.categoryId = b.id
	where a.active = true `;

	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	})
		.then(list => {

		res.send(list)
})
};

exports.getItemSelect = (req, res) => {
	let query = `SELECT id as value, itemName as label 
	 FROM tbl_item where active = true `; 
   
   sequelize.query(query, {
	   type: sequelize.QueryTypes.SELECT
   })
	   .then(list => {
		   
		   res.send(list)
	   })
};

exports.getItemSelectNotIncluded = (req, res) => {
	let query = `SELECT id as value, itemName as label 
	 FROM tbl_item where active = true and id !=`+req.params.itemId; 
   
   sequelize.query(query, {
	   type: sequelize.QueryTypes.SELECT
   })
	   .then(list => {
		   
		   res.send(list)
	   })
};


exports.getMatchItemById =async (req, res) => {
	console.log(req)
	let price = '';
	let item = []

	let itemQuery = `SELECT a.id as matchItemId, b.id,b.itemName,b.shortName,b.shortNote,b.description,b.categoryId
	 from tbl_matchoutfititem as a inner join tbl_item as b
	on a.matchItemId = b.id where itemId = `+ req.params.id ;
	
	item = await sequelize.query(itemQuery, {
        type: sequelize.QueryTypes.SELECT
	});

	for (var i = 0; i < item.length; i++) {
        let priceQuery = `Select * from tbl_itemprice
		 where item=` + item[i].id;
		 let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		 varientone =  await sequelize.query(varientOneQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}
	console.log(item)
	res.send(item)


    
}



exports.getRelatedItem =async (req, res) => {
	let price = '';
	let item = []
	
    let itemQuery = `SELECT * from tbl_item where categoryId = `+ req.params.categoryId + ` and id !=`+ req.params.itemId;
	item = await sequelize.query(itemQuery, {
        type: sequelize.QueryTypes.SELECT
	});

	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}	
	res.send(item)
}



exports.getMatchItemByMainCategoryId =async (req, res) => {
	let price = '';
	let item = [];


	let itemQuery = `SELECT  b.id, b.ocassionId, b.itemName,b.shortName,b.shortNote,b.description,b.categoryId
	from tbl_subcategory as a left join tbl_item as b on a.id= b.categoryID where a.mainCategoryId = `+ req.params.id ;

	item = await sequelize.query(itemQuery, {
		type: sequelize.QueryTypes.SELECT
	});
	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}
	res.send(item)


}



exports.getMatchItemByCategoryId =async (req, res) => {
	let price = '';
	let item = []

	let itemQuery = `SELECT  b.id, b.ocassionId,b.itemName,b.shortName,b.shortNote,b.description,b.categoryId
	from tbl_item as b where categoryId = `+ req.params.id ;

	item = await sequelize.query(itemQuery, {
		type: sequelize.QueryTypes.SELECT
	});
	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}
	res.send(item)


}




exports.getItemHome = async (req, res) => {

	let price = '';
	let item = []
	
    let itemQuery = `SELECT a.id, itemName, shortName,shortNote,a.description,
	a.categoryId, a.active, b.subCategoryName 
	 FROM tbl_item as a inner join tbl_subcategory as b on a.categoryId = b.id
		where a.active = true and a.isHomeDisplay = true and a.isNewArrival = true`;
		
    item = await sequelize.query(itemQuery, {
        type: sequelize.QueryTypes.SELECT
    });

	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}
	debugger;
	res.send(item)
};

exports.getPromotionItem = async (req, res) => {

	let price = '';
	let item = []
	
    let itemQuery = `SELECT a.id, itemName, shortName,shortNote,a.description,
	a.categoryId, a.active, b.subCategoryName 
	 FROM tbl_item as a inner join tbl_subcategory as b on a.categoryId = b.id
		where a.active = true and a.isHomeDisplay = true and a.isPromotion = true`;
		
    item = await sequelize.query(itemQuery, {
        type: sequelize.QueryTypes.SELECT
    });

	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}	
	res.send(item)
};


exports.getBestSellingItem = async (req, res) => {

	let price = '';
	let item = []
	
    let itemQuery = `SELECT a.id, itemName, shortName,shortNote,a.description,
	a.categoryId, a.active, b.subCategoryName 
	 FROM tbl_item as a inner join tbl_subcategory as b on a.categoryId = b.id
		where a.active = true and a.isHomeDisplay = true and a.isBestSelling = true`;
		
    item = await sequelize.query(itemQuery, {
        type: sequelize.QueryTypes.SELECT
    });

    for (var i = 0; i < item.length; i++) {
        let priceQuery = `Select * from tbl_itemprice
		 where item=` + item[i].id;
		 let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
        price = await sequelize.query(priceQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		 varientone =  await sequelize.query(varientOneQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
	}	
	res.send(item)
};
	exports.getNewArrivalItem = async (req, res) => {

	let price = '';
	let item = []

	let itemQuery = `SELECT a.id, itemName, shortName,shortNote,a.description,
		a.categoryId, a.active, b.subCategoryName
	FROM tbl_item as a inner join tbl_subcategory as b on a.categoryId = b.id
	where a.active = true and a.isHomeDisplay = true and a.isNewArrival = true`;

	item = await sequelize.query(itemQuery, {
		type: sequelize.QueryTypes.SELECT
	});

	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
	}
	res.send(item)
};




// Find a Photo by Id
exports.findPhotoById = (req, res) => {
	Photo.findAll({
		where: {
			itemId: req.params.itemId
		}
	}
	).then(photo => {
		res.send(photo)
	})
};

exports.getMatchItem = async (req, res) => {

	let price = '';
	let item = []
	let items=[]
	let itemQuery = `SELECT a.*,b.photoName,c.price,c.discountPrice,c.quantity,c.varientOne,c.varientTwo
	from tbl_item as a inner join tbl_itemphoto as b
	on a.id = b.itemId inner join tbl_itemprice as c on a.id=c.item where a.id = `+ req.params.id+` limit 1` ;

	item = await sequelize.query(itemQuery, {
		type: sequelize.QueryTypes.SELECT
	});

	for (var i = 0; i < item.length; i++) {
		let priceQuery = `Select * from tbl_itemprice
		where item=` + item[i].id;
		let photoQuery = `Select * from tbl_itemphoto where itemId = ` + item[i].id;
		let varientOneQuery=  `Select * from tbl_varientone
		where item=` + item[i].id;
		let varientOneQueryN=  `Select varientNameOne from tbl_varientone
		where item=` + item[i].id;

		let varientTwoQuery=  `Select * from tbl_varienttwo
		where item=` + item[i].id;
		let varientTwoQueryN=  `Select varientNameTwo from tbl_varienttwo
		where item=` + item[i].id;
		price = await sequelize.query(priceQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		photo = await sequelize.query(photoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientone =  await sequelize.query(varientOneQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
			type: sequelize.QueryTypes.SELECT
		});
		varientColor =await sequelize.query(varientOneQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		varientSize =await sequelize.query(varientTwoQueryN, {
			type: sequelize.QueryTypes.SELECT
		});
		let color = []
		for (var j = 0; j < varientColor.length; j++) {
			color[j]=varientColor[j].varientNameOne;
		}
		let size = []
		for (var j = 0; j < varientSize.length; j++) {
			size[j]=varientSize[j].varientNameTwo;
		}
		item[i].detail = price
		item[i].photo = photo
		item[i].varientone = varientone
		item[i].varienttwo = varienttwo
		item[i].varientColor = color
		item[i].varientSize = size
	}
	console.log(item)
	res.send(item)

};

exports.getPhotoPath = (req, res) => {
	const fileName = req.params.fileName;
	const mimeType = fileName.split('.')[1];
	var staticResource = itemPhotoPath + fileName;
	fs.readFile(staticResource, (err, data) => {
		if (err) {
			console.log("Can't read file");
		}
		res.writeHead(200, { 'Content-Type': mimeType });
		res.end(data)
	});

};

exports.getCheckOutItem =async (req, res) => {
	
	let data = req.body;
	
	for (var i = 0; i < data.length; i++) {
		if(data[i].varientOneId === '' && data[i].varientTwoId ==='') {
			
			data[i].varientone = '-';
			data[i].varienttwo = '-';
		}
		else if(data[i].varientTwoId === '') {
			data[i].varienttwo = '-';
		}
		else if(data[i].varientOneId === '') {
			data[i].varientone = '-';
		}
		else{
			 let varientOneQuery=  `Select * from tbl_varientone
		 where id=` + data[i].varientOneId;
		let varientTwoQuery=  `Select * from tbl_varienttwo
		where id=` + data[i].varientTwoId;
    
		 varientone =  await sequelize.query(varientOneQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		varienttwo=  await sequelize.query(varientTwoQuery, {
            type: sequelize.QueryTypes.SELECT
		});
		data[i].varientone = varientone
		data[i].varienttwo = varienttwo

		}
    
	}	
	res.send(data)


};




//Fetch one item photo
exports.findOnePhotoByItemId = (req, res) => {
	Photo.findAll({
		where: {
			itemId: req.params.itemId
		}
	}).then(photo => {
		const fileName = photo[0].photoName;
		const mimeType = fileName.split('.')[1];
		var staticResource = itemPhotoPath + fileName;
		fs.readFile(staticResource, (err, data) => {
			if (err) {
				console.log("Can't read file");
			}
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(data)
		});
	})
}

exports.getItemListByCampaign = (req, res) => {
	Item.findAll({
		where: {
			campaign: req.params.campaign
		}
	})
		.then(item => {
			res.send(item);
		})
}


//Find Item By Id
exports.findById = (req, res) => {
	Item.findById(req.params.itemId).then(item => {
		res.send(item);
	})
};


exports.findAllByActive = (req, res) => {
	Item.findAll({
		where: {
			active: true
		}
	}
	).then(item => {
		res.send(item);
	});
}

exports.getItemWithPriceByActive = (req, res) => {
	var query = "select item.*, min(p.discountPrice) as discount, max(p.price) as price" +
		" from tbl_item as item inner join tbl_itemprice as p" +
		" on item.id=p.item where item.active = true group by item.id";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(item => {
		res.send(item)
	})
}

exports.getItemViewById = (req, res) => {
	var query = `SELECT a.id, itemName, shortName,shortNote,a.description,
	a.categoryId, a.active, b.subCategoryName
	 FROM tbl_item as a inner join tbl_subcategory as b on a.categoryId = b.id
		where a.id =`+ req.params.itemId;
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(item => {
		res.send(item)
	})
}


exports.getItemListByCategory = (req, res) => {
	var query = "select item.*, min(p.discountPrice) as discount, max(p.price) as price" +
		" from tbl_item as item inner join tbl_itemprice as p" +
		" on item.id=p.item where item.active = true and item.categoryId=" + req.params.category + " group by item.id";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(item => {
		res.send(item)
	console.log(item)
	})

}


exports.getLowestPriceItem = (req, res) => {
	var query = "select item.*, min(p.discountPrice) as discount, max(p.price) as price" +
		" from tbl_item as item inner join tbl_itemprice as p" +
		" on item.id=p.item where item.active = true group by item.id order by discount asc";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(item => {
		res.send(item)
	})
}

exports.getHighestPriceItem = (req, res) => {
	var query = "select item.*, min(p.discountPrice) as discount, max(p.price) as price" +
		" from tbl_item as item inner join tbl_itemprice as p" +
		" on item.id=p.item where item.active = true group by item.id order by discount desc";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(item => {
		res.send(item)
	})
}

exports.getPopularItem = (req, res) => {
	var query = "select item.*, min(p.discountPrice) as discount, max(p.price) as price" +
		" from tbl_item as item inner join tbl_itemprice as p" +
		" on item.id=p.item where item.active = true group by item.id";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(item => {
		res.send(item)
	})
}



