module.exports = function(app) {
    const upload = require('../config/multer.config');
      const brand = require('../controller/brand.controller.js');
   
      // Create a new Supplier
      app.post('/api/addNewBrand',upload.single('uploadfile'), brand.create);
     // Show Category Photo Path
     app.get('/api/getBrandPhotoPath/:fileName',brand.getPhotoPath);
      // Retrieve all Supplier
      app.get('/api/getAllBrand', brand.findAll);
      // Update a Supplier with Id
      app.put('/api/updateBrand/:brandId',upload.single('uploadfile'), brand.update);
        //Retrieve all Category by active
        app.get('/api/getBrandByActive',brand.findAllByActive);
   
  
  }