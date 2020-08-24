module.exports = function(app) {
 
    const adminUser = require('../controller/adminUser.controller');
    const  upload  = require('../config/adminuser.multer.config');
 
    // Create a new AdminUser
    app.post('/api/addAdminUser',upload.single('uploadfile'), adminUser.create);
 
    // Retrieve all AdminUser
    app.get('/api/getAllAdminUser', adminUser.findAll);
    // Show Profile Photo Path
    app.get('/api/getAdminPhotoPath/:fileName',adminUser.getPhotoPath);
  
    //Update a AdminUser with Id
    app.put('/api/updateAdminUser/:adminId',upload.single('uploadfile'), adminUser.updateAdmin);

    //Check username and password
    app.get('/api/checkAccount/:userName/:password',adminUser.check);

}