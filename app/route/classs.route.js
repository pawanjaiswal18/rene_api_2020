module.exports = function(app) {
    const classs = require('../controller/classs.controller.js');

    // Create a new classs
    app.post('/api/addNewClasss', classs.create);
    // Retrieve all classs
    app.get('/api/getAllClasss', classs.findAll);
    // Update a classs with Id
    app.put('/api/updateClasss/:classsId', classs.update);
    //Retrieve all Classs by active
    app.get('/api/getClasssByActive', classs.findAllByActive);
}
