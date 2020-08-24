const db = require('../config/db.config.js');
//db.tbl_subscriber = require('../model/subscriber.model.js');

const Subscriber = db.tbl_subscriber;

exports.create = (req, res) => {	
	// Save to MySQL database
	console.log(req.body.email_id);
	// Subscriber.create({  
	//   email_id: req.body.email_id,
	 
	// }).then(subscriber => {		
		
	// 	res.send(subscriber);
	// });
};
 

exports.findAll = (req, res) => {

	Subscriber.findAll({}).then(list => {
	    res.send(list);
	})
	.catch((error) => {
        console.log(error.toString());
        res.status(400).send(error)
    });
};

