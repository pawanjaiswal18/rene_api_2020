const db = require('../config/db.config.js');
const Supplier = db.tbl_supplier;
const sequelize = db.sequelize;

// Post a Supplier
exports.create = (req, res) => {	
    console.log(req.body)
	// Save to MySQL database
	Supplier.create({  
    supplierName: req.body.supplierName,
    email:req.body.email,
    address:req.body.address,
    phone:req.body.phone,
    description: req.body.description,
	active:req.body.active,
	creationUser:req.body.creationUser
	}).then(supplier => {		
		
		res.send(supplier);
	});
};
//testing
exports.selectTesting = (req,res) => {
	sequelize.query('SELECT * FROM tbl_suppliers',
  { replacements: ['active'], type: sequelize.QueryTypes.SELECT }
).then(supplier => {
  res.send(supplier)
})

} 

// FETCH all Supplier
exports.findAll = (req, res) => {
	Supplier.findAll().then(supplier => {
	
	  res.send(supplier);
	});
};
exports.findAllByActive = ( req,res) => {
	Supplier.findAll({
		where:{
			active:true
		}}
	).then(supplier =>{
		res.send(supplier);
	});
}

// Update a Supplier
exports.update = (req, res) => {
    const id = req.params.supplierId;
  
	Supplier.update( { supplierName: req.body.supplierName,
		email:req.body.email,
		address:req.body.address,
		phone:req.body.phone,
		description:req.body.description,
		active:req.body.active,
		updatedUser:req.body.updatedUser
	}, 
					 { where: {id: req.params.supplierId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a supplier with id = " + id);
				   });
};
 
