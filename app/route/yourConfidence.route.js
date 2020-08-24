module.exports = function(app) {
    const upload = require('../config/yourConfidence.multer.config');
    const ycgallery = require('../controller/yourConfidence.controller.js');

    // Create a new category
    app.post('/api/addNewModel', upload.single('uploadfile'), ycgallery.create);
    // Show Category Photo Path
    app.get('/api/getYcGalleryPhotoPath/:fileName', ycgallery.getPhotoPath);

    // Update a category with Id
    app.put('/api/updateycgallery/:ycgalleryId', upload.single('uploadfile'), ycgallery.update);
    //Retrieve all Category by active
    app.get('/api/getycgallery', ycgallery.getAll);
}