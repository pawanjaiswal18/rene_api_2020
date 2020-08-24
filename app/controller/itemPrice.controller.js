const db = require('../config/db.config.js');
const Price = db.tbl_itemprice;
const VarientOne = db.tbl_varientone;
const VarientTwo = db.tbl_varienttwo;

// Post a Price
exports.create = (req, res) => {
	Price.findAll({
		where: { item: req.body.item, varientOne: req.body.varientOne, varientTwo: req.body.varientTwo }
	}).then(price => {

		if (price.length === 0) {

			//Save to MySQL database
			Price.create({
				item: req.body.item,
				price: req.body.price,
				quantity: req.body.quantity,
				itemCode: req.body.itemCode,
				varientOne: req.body.varientOne,
				varientTwo: req.body.varientTwo,
				creationUser: req.body.creationUser
			}).then(price => {

				res.send("success");
			});
		}
		else {
			res.status(401).send("fail");

		}
	})

};

exports.findAll = (req, res) => {
	Price.findAll().then(price => {

		res.send(price);
	});
};

// exports.find = (req, res) => {
// 	Price.findAll ({
// 		include:[{
// 			model:VarientOne,
// 			through:{

// 			}

// 		}],
// 		// // include:[{
// 		// // 	model:VarientTwo
// 		// // }],
// 		// include:[{
// 		// 	model:Item
// 		// }]

// 	}).then (item => {
// 		res.send(item)
// 	});
// };

//Update Price

exports.update = (req, res) => {
	const id = req.params.priceId;

	Price.update({
		item: req.body.item,
		price: req.body.price,
		quantity: req.body.quantity,
		itemCode: req.body.itemCode,
		varientOne: req.body.varientOne,
		updatedUser: req.body.updatedUser,
		varientTwo: req.body.varientTwo
	},
		{ where: { id: req.params.priceId } }
	).then(() => {
		res.status(200).send("updated successfully a price with id = " + id);
	});

};
exports.getPriceByItemId = (req, res) => {
	Price.findAll({
		where: { item: req.params.itemId }
	}).then(price => {
		res.send(price);
	})
}

exports.getPriceById = (req, res) => {
	Price.findOne({
		where: { id: req.params.id }
	}).then(price => {
		res.send(price);
	})
}

exports.getItemPrice = (req, res) => {
	Price.findAll({
		where: { item: req.params.itemId }
	}).then(item => {
		res.send(item)
	})
}

exports.getItemStock = (req, res) => {
	console.log(req.body)
	Price.find({
		where: { id: req.body.priceId }
	}).then(price => {

		res.send(price)
	})
}

// exports.getItemStockInCart= (req, res) => {
// 	var newitemlist=[];
// 	var itemlist = req.body;
// 	for(var i=0; i< itemlist.length; i++){
// 		Price.find({
// 			 	where: { id:itemlist[i].priceId }
// 			 }).then(price => {
// 				 var nodedata = price.quantity;
// 				 console.log(nodedata)
// 				//  console.log(price.quantity)
// 				// newitemlist.push(price.quantity)

// 			  })

// 	}

// }

exports.getItemStockInCart = async (req, res) => {
	var itemlist = req.body;

	let price = []
	for (var i = 0; i < itemlist.length; i++) {

		price[i] = await Price.find({
			where: { id: itemlist[i].priceId }
		})
		//	console.log(price.quantity)
	}
	res.send(price)

}

exports.getItemStockWithVarient = (req, res) => {
	VarientOne.findAll({
		where: { item: req.params.itemId },
		attributes: ['id', 'varientNameOne', 'varientGroupNameOne', 'varientOneImage'],
		include: [{
			model: Price,
			attributes: ['id', 'discountPrice', 'price', 'varientTwo', 'quantity', 'itemCode'], // this may not be needed
			include: [{
				model: VarientTwo,
				attributes: ['varientNameTwo', 'varientGroupNameTwo']
			}]
		}]
	}).then(item => {
		res.status(200).json(item)
	})
}


// get price for varient by one item id
exports.getPriceForVarientByItemId = (req, res) => {
	var query = "select p.discountPrice as discount, p.price as price," +
		" vone.varientNameOne, vone.varientGroupNameOne, vone.varientOneImage," +
		" vtwo.varientNameTwo, vtwo.varientGroupNameTwo" +
		" from shal_zay.tbl_itemPrices as p" +
		" left join shal_zay.tbl_varientOnes as vone" +
		" on (p.varientOne = vone.id and p.varientOne > 0)" +
		" left join shal_zay.tbl_varientTwos as vtwo" +
		" on (p.varientTwo = vtwo.id and p.varientTwo >0)" +
		" where p.item = " + req.params.itemId;

	sequalize.query(query, {
		type: sequalize.QueryTypes.SELECT
	}).then(price => {
		res.send(price);
	})
}


