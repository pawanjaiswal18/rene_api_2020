module.exports = function(app) {
  const upload = require('../config/category.multer.config');
    const category = require('../controller/category.controller.js');
    
    // Create a new category
    app.post('/api/addNewCategory',upload.single('uploadfile'), category.create);
   // Show Category Photo Path
   app.get('/api/getCategoryPhotoPath/:fileName',category.getPhotoPath);
    // Retrieve all category
    app.get('/api/getAllCategory', category.findAll);
    // Update a category with Id
    app.put('/api/updateCategory/:categoryId',upload.single('uploadfile'), category.update);
      //Retrieve all Category by active
     app.get('/api/getCategoryByActive',category.findAllByActive);

 
  // Create a new subcategory
  app.post('/api/addSubCategory',upload.single('uploadfile'), category.createSubCategory);
      //retrive all subcategory
      app.get('/api/getAllSubCategory', category.findSubCategory);
      // Update a category with Id
      app.put('/api/updateSubCategory/:subCategoryId',upload.single('uploadfile'), category.updateSubCategory);
        //Retrieve all Category by active
        app.get('/api/getSubCategoryByActive',category.findSubCategoryByActive);
  app.get('/api/getTop3MainCategory',category.findTop3MainCategory)

}