module.exports = function(app) {
 
    const supplier = require('../controller/supplier.controller.js');
 
    // Create a new Supplier
    app.post('/api/addNewSupplier', supplier.create);
    
    // Retrieve all Supplier
    app.get('/api/getAllSupplier', supplier.findAll);
    //Retrieve all Supplier by active
    app.get('/api/getSupplierByActive',supplier.findAllByActive);
    // Update a Supplier with Id
    app.put('/api/updateSupplier/:supplierId', supplier.update);
 
    app.get('/api/getSupp',supplier.selectTesting);

}