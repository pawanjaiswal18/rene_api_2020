module.exports = function(app) {
 
    const shippingFee = require('../controller/shippingFee.controller');

      //set new shipping fee
      app.post('/api/addNewShippingFee', shippingFee.create);
         // Retrieve all Shipping Fee
    app.get('/api/getAllShippingFee', shippingFee.findAll);
    //Retrieve all Shipping Fee for table 
    app.get('/api/getShippingFeeTable', shippingFee.getshipFeeTable)
      // Update Shipping with Id
      app.put('/api/updateShippingFee/:shipId', shippingFee.update);
       // Get Shipping Fee by Item and City
    app.post('/api/getShippingFeeByItemAndCity',shippingFee.getShippingFeeByItemAndCity)

   
}