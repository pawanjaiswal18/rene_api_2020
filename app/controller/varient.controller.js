
const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Price = db.tbl_itemprice;
const VarientOne = db.tbl_varientone;
const VarientTwo = db.tbl_varienttwo;
const fs = require('fs');
const { upload } = require('../config/Global');


// FETCH all Varient One
exports.varientOneFindAll = (req, res) => {
	VarientOne.findAll().then(varient => {
		res.send(varient);
	});
};

// FETCH all Varient One
exports.varientTwoFindAll = (req, res) => {
	VarientTwo.findAll().then(varient => {
		res.send(varient);
	});
};



// FETCH all Varient One
exports.getVarientOneByItem = (req, res) => {
	VarientOne.findAll({
		where: { item: req.params.itemId }
	}).then(varient => {
		res.send(varient);
	});
};

// FETCH all Varient One
exports.getVarientTwoByItem = (req, res) => {
	VarientTwo.findAll(
		{
			where: { item: req.params.itemId }
		}).then(varient => {
			res.send(varient);
		});
};



//Post a Varient One
exports.createVarientOne = (req, res) => {

	//Save to MySQL database
	if (req.file == undefined) {

		VarientOne.findAll({
			where: {
				varientNameOne: req.body.varientNameOne,
				item:req.body.item
			}
		}).then(list => {
		
			if (list.length > 0) res.status(500).send("fail");
			else {
				VarientOne.create({
					item: req.body.item,
					varientOneImage: 'default-image.jpg',
					varientGroupNameOne: req.body.varientGroupNameOne,
					varientNameOne: req.body.varientNameOne,
					creationUser: req.body.creationUser
		
				}).then(varient => {
		
					res.send("success");
				});
			}
		})
	
	}
	else {
VarientOne.findAll({
	where: {
		varientNameOne: req.body.varientNameOne,
		item:req.body.item
	}
}).then(list => {
	
	if (list.length > 0) res.status(500).send("fail");
	else {
		VarientOne.create({
			item: req.body.item,
			varientOneImage: req.file.filename,
			varientGroupNameOne: req.body.varientGroupNameOne,
			varientNameOne: req.body.varientNameOne,
			creationUser: req.body.creationUser
		}).then(varient => {

			res.status(200).send("success");
		});
	}
})

	
	}
}


//Post a Varient Two
exports.createVarientTwo = (req, res) => {
	// Save to MySQL database

	VarientTwo.findAll({
		where: {
			varientNameTwo: req.body.varientNameTwo,
			item:req.body.item
		}
	}).then(list => {
	
		if (list.length > 0) res.status(500).send("fail");
		else {
			VarientTwo.create({
				item: req.body.item,
				varientGroupNameTwo: req.body.varientGroupNameTwo,
				varientNameTwo: req.body.varientNameTwo,
				creationUser: req.body.creationUser
	
			}).then(varient => {
	
				res.send("success");
			});
		}
	})

}


// show photo path
exports.getPhotoPath = (req, res) => {
	const fileName = req.params.fileName;
	const mimeType = fileName.split('.')[1];
	var staticResource = item_upload + fileName;
	fs.readFile(staticResource, (err, data) => {
		if (err) {
			console.log("Can't read file");
		}
		res.writeHead(200, { 'Content-Type': mimeType });
		res.end(data)
	});

};
// Update Varient One2
exports.updateVarientOne = (req, res) => {
	const id = req.params.varientId;

	if (req.file == undefined) {
		VarientOne.update({
			item: req.body.item,
			varientNameOne: req.body.varientNameOne, varientGroupNameOne: req.body.varientGroupNameOne, updatedUser: req.body.updatedUser
		},
			{ where: { id: req.params.varientId } }
		).then(() => {
			res.status(200).send("updated successfully a varientOne with id = " + id);
		});
	}
	else {
		VarientOne.update({
			item: req.body.item,
			varientNameOne: req.body.varientNameOne, varientGroupNameOne: req.body.varientGroupNameOne,
			varientOneImage: req.file.filename, updatedUser: req.body.updatedUser
		},
			{ where: { id: req.params.varientId } }
		).then(() => {
			res.status(200).send("updated successfully a varientOne with id = " + id);
		});
	}
};


exports.updateVarientTwo = (req, res) => {
	const id = req.params.varientId;

	VarientTwo.update({
		item: req.body.item,
		varientNameTwo: req.body.varientNameTwo, varientGroupNameTwo: req.body.varientGroupNameTwo, updatedUser: req.body.updatedUser
	},
		{ where: { id: req.params.varientId } }
	).then(() => {
		res.status(200).send("updated successfully a varientTwo with id = " + id);
	});


};

exports.getVarientWithPrice = (req, res) => {
	VarientOne.findAll({
		where: { item: req.params.itemId },
		attributes: ['id', 'varientNameOne', 'varientGroupNameOne', 'varientOneImage'],
		include: [{
			model: Price,
			attributes: ['id', 'discountPrice', 'price', 'varientTwo', 'quantity'], // this may not be needed
			include: [{
				model: VarientTwo,
				attributes: ['varientNameTwo', 'varientGroupNameTwo']
			}]
		}]
	}).then(item => {
		res.status(200).json(item)
	})
}


// };
// // Post a Varient
// exports.create = (req, res) => {	
// 	var vG2=null;
// 	if(req.body.varientGroupNameTwo == undefined)
// 	{
// 		vG2 = vG2
// 	}
// 	else{
// 		vG2= req.body.varientGroupNameTwo
// 	}
// 	// Save to MySQL database
// 	if(req.file ==undefined)
// 	{

// 		Varient.create({  
// 			item: req.body.item,
// 			quantity:req.body.quantity,
// 			price:req.body.price,
// 			varientOneImage:'default-image.jpg',
// 			discountPrice:req.body.discountPrice,
// 			varientGroupNameOne:req.body.varientGroupNameOne,
// 			varientNameOne: req.body.varientNameOne,
// 			varientGroupNameTwo:vG2,
// 			varientNameTwo:req.body.varientNameTwo,
// 			description:req.body.description
// 			}).then(varient => {		

// 				res.send(varient);
// 			});
// 	}
// 	else{
// 		Varient.create({  
// 			item: req.body.item,
// 			quantity:req.body.quantity,
// 			price:req.body.price,
// 			varientOneImage:req.file.filename,
// 			discountPrice:req.body.discountPrice,
// 			varientGroupNameOne:req.body.varientGroupNameOne,
// 			varientNameOne: req.body.varientNameOne,
// 			varientGroupNameTwo:req.body.varientGroupNameTwo,
// 			varientNameTwo:req.body.varientNameTwo,
// 			description:req.body.description
// 			}).then(varient => {		

// 				res.send(varient);
// 			});
// 	}

// };





// exports.getVareintByGroup = ( req,res) => {
// 	const varientName=req.params.varientName;
// 	Varient.findAll({
// 		where:{
// 			[Op.and]:
// 			[{varientNameOne:varientName},
// 			{varientGroupNameTwo:
// 				{[Op.ne]:'null'}
// 			}
// 			]


// 		}}
// 	).then(varient =>{
// 		res.send(varient);
// 	});
// }




// exports.update = (req, res) => {
// 	const id = req.params.varientId;
// 	console.log(req.file)
// 	if( req.file == undefined){
// 		Varient.update( { item: req.body.item,quantity:req.body.quantity,price:req.body.price,discountPrice:req.body.discountPrice,
// 			varientNameOne:req.body.varientNameOne,varientGroupNameOne:req.body.varientGroupNameOne,description:req.body.description,
// 			varientGroupNameTwo:req.body.varientGroupNameTwo,varientNameTwo:req.body.varientNameTwo}, 
// 			{ where: {id: req.params.varientId} }
// 		  ).then(() => {
// 			res.status(200).send("updated successfully a varient with id = " + id);
// 		  });
// 	}
// 	else{
// 	Varient.update( { item: req.body.item,quantity:req.body.quantity,price:req.body.price,discountPrice:req.body.discountPrice,
// 		varientNameOne:req.body.varientNameOne,varientGroupNameOne:req.body.varientGroupNameOne,varientGroupNameTwo:req.body.varientGroupNameTwo,
// 		varientOneImage:req.file.filename,varientNameTwo:req.body.varientNameTwo,description:req.body.description}, 
// 					 { where: {id: req.params.varientId} }
// 				   ).then(() => {
// 					 res.status(200).send("updated successfully a varient with id = " + id);
// 				   });
// 	}
// };


// exports.getVarientByItemId = (req, res) => {
// 	Varient.findAll({
// 		where: { item: req.params.itemId }
// 	})
// 		.then(varient => {
// 			res.send(varient);
// 		});

// }



