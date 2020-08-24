module.exports = function(app) {
    const upload = require('../config/ocassion.multer.config');
    const ocassion = require('../controller/ocassion.controller.js');

    // Create a new ocassion
    app.post('/api/addNewOcassion', upload.single('uploadfile'), ocassion.create);
    // Show Ocassion Photo Path
    app.get('/api/getOcassionPhotoPath/:fileName', ocassion.getPhotoPath);
    // Retrieve all ocassion
    app.get('/api/getAllOcassion', ocassion.findAll);
    app.get('/api/findAllOcassion', ocassion.findAllOcassion);
    // Update a ocassion with Id
    app.put('/api/updateOcassion/:ocassionId', upload.single('uploadfile'), ocassion.update);
    //Retrieve all Ocassion by active
    app.get('/api/getOcassionByActive', ocassion.findAllByActive);
}