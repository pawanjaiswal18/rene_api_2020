module.exports = function(app) {
 
    const city = require('../controller/city.controller.js');
 
    // Create a new City
    app.post('/api/addCity', city.create);
   
    // Retrieve all City
    app.get('/api/getAllCity', city.findAll);

    //Retrieve all City By Active
    app.get('/api/getAllCityActive',city.findCityByActive);
 
    // // Retrieve a single City by Id
    // app.get('/api/customers/:customerId', city.findById);
 
    // Update a City with Id
    app.put('/api/updateCity/:cityId', city.update);
 
    // // Delete a City with Id
    // app.delete('/api/customers/:customerId', customers.delete);
}