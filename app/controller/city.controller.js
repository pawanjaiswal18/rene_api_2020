const db = require('../config/db.config.js');
const City = db.tbl_city;

// Post a City
exports.create = (req, res) => {	
	// Save to MySQL database
	City.create({  
	  cityName: req.body.cityName,
	 
	}).then(city => {		
		
		res.send(city);
	});
};
 
// FETCH all Cities
exports.findAll = (req, res) => {
	City.findAll().then(city => {
	
	  res.send(city);
	});
};
exports.findCityByActive = (req,res) => {
	City.findAll({
		where: {
			active: true
		}
	}
	).then(city => {
		res.send(city);
	});
}

// // Find a Customer by Id
// exports.findById = (req, res) => {	
// 	Customer.findById(req.params.customerId).then(customer => {
// 		res.send(customer);
// 	})
// };
 
// Update a City
exports.update = (req, res) => {
    const id = req.params.cityId;
	City.update( { cityName: req.body.cityName}, 
					 { where: {id: req.params.cityId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a city with id = " + id);
				   });
};
 
// // Delete a Customer by Id
// exports.delete = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.destroy({
// 	  where: { id: id }
// 	}).then(() => {
// 	  res.status(200).send('deleted successfully a customer with id = ' + id);
// 	});
// };