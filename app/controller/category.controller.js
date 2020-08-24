const db = require('../config/db.config.js');
const Category = db.tbl_category;
const SubCategory = db.tbl_subcategory;
const sequelize = db.sequelize;
const  path  = require('../config/Global');
const fs = require('fs');
// Post a Category
exports.create = (req, res) => {

	if (req.file == undefined) {
	
		Category.create({
			categoryName: req.body.categoryName,
			description: req.body.description,
			active: req.body.active,
			classId: req.body.classId,
			isHomeDisplay:req.body.isHomeDisplay,
			creationUser:req.body.creationUser,
			categoryImage: 'default-image.jpg',

		}).then(category => {

			res.send(category);
		});
	}
	else {
		Category.create({
			categoryName: req.body.categoryName,
			description: req.body.description,
			creationUser:req.body.creationUser,
			active: req.body.active,
			classId: req.body.classId,
			isHomeDisplay:req.body.isHomeDisplay,
			categoryImage: req.file.filename,

		}).then(category => {

			res.send(category);
		});
	}
};

 exports.findAllByActive = (req, res) => {
	let query = `SELECT id as value, categoryName as label FROM tbl_category where active = true `; 
    
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

	var staticResource = path.categoryPhotoPath + fileName;
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
// FETCH all Category
exports.findAll = (req, res) => {
	let query = `SELECT a.id, a.categoryName, a.classsId, a.description, a.categoryImage, a.creationUser, a.updatedUser, a.createdAt, a.updatedAt, a.isHomeDisplay,a.active,
		b.classsName FROM tbl_category
	as a inner join tbl_classs as b on a.classsId = b.id`;

	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	})
		.then(list => {

		res.send(list)
})

};
// Update a Category
exports.update = (req, res) => {
	
	const id = req.params.categoryId;
	if (req.file == undefined) {
		Category.update({ categoryName: req.body.categoryName,classId: req.body.classId, description: req.body.description, active: req.body.active,isHomeDisplay:req.body.isHomeDisplay, updatedUser:req.body.updatedUser },
			{ where: { id: req.params.categoryId } }
		).then(() => {
			res.status(200).send("updated successfully a category with id = " + id);
		});
	}
	else {
		Category.update({ categoryName: req.body.categoryName,classId: req.body.classId,categoryImage: req.file.filename, description: req.body.description,isHomeDisplay:req.body.isHomeDisplay, active: req.body.active,updatedUser:req.body.updatedUser },
			{ where: { id: req.params.categoryId } }
		).then(() => {
			res.status(200).send("updated successfully a category with id = " + id);
		});
	}

};


exports.createSubCategory = (req, res) => {

		SubCategory.create({
			subCategoryName: req.body.subCategoryName,
			description: req.body.description,
			creationUser:req.body.creationUser,
			active: req.body.active,
			isHomeDisplay:req.body.isHomeDisplay,
			mainCategoryId: req.body.mainCategoryId

		}).then(category => {

			res.send(category);
		});
	
};

// FETCH all Category
exports.findSubCategory = (req, res) => {
	let query = `SELECT id as value , subCategoryName as label FROM tbl_subcategory where active = true `; 
   
   sequelize.query(query, {
	   type: sequelize.QueryTypes.SELECT
   })
	   .then(list => {
		   
		   res.send(list)
	   })
};


exports.findTop3MainCategory = async (req, res) => {
	let subCategory = '';
    let mainCategory = []
    let mCategoryQuery = `Select id, categoryName,categoryImage from tbl_category where isHomeDisplay = true`;
    mainCategory = await sequelize.query(mCategoryQuery, {
        type: sequelize.QueryTypes.SELECT
    });

    for (var i = 0; i < mainCategory.length; i++) {
        let subCategoryQuery = `Select id,subCategoryName from tbl_subcategory
     	where isHomeDisplay= true and mainCategoryId=` + mainCategory[i].id ;

        subCategory = await sequelize.query(subCategoryQuery, {
            type: sequelize.QueryTypes.SELECT
        });
		mainCategory[i].detail = subCategory
	}
	res.send(mainCategory)
};
exports.findSubCategoryByActive = (req, res) => {
	let query = `SELECT a.id, a.mainCategoryId,a.subCategoryName,a.description,a.isHomeDisplay,a.active,
	b.categoryName FROM tbl_subcategory
	as a inner join tbl_category as b on a.mainCategoryId = b.id`; 
	
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
			
            res.send(list)
        })
}
// Update a sub Category
exports.updateSubCategory = (req, res) => {
	const id = req.params.subCategoryId;
		SubCategory.update({ subCategoryName: req.body.subCategoryName, mainCategoryId:req.body.mainCategoryId,
			 description: req.body.description,isHomeDisplay:req.body.isHomeDisplay, active: req.body.active, updatedUser:req.body.updatedUser },
			{ where: { id: id } }
		).then(() => {
			res.status(200).send("updated successfully a category with id = " + id);
		});


};



