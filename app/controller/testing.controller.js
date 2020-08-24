const db = require('../config/db.config.js');
const Testing = db.tbl_testing;

// Post a Category
exports.create = (req, res) => {	
   console.log(req.body)
   console.log(req.file);
	// Save to MySQL database
	Testing.create({  
    fileName:req.body.filename,
    userName:req.body.username,
    
	}).then(testing => {		
		
		res.send(testing);
	});
};