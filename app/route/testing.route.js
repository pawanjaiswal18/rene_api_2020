module.exports = function(app) {
 
    const testing = require('../controller/testing.controller');
    const upload = require('../config/multer.config');
 
    // Create a new AdminUser
    app.post('/api/addTesting',upload.single('uploadfile'), testing.create);
}