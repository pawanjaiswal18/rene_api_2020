module.exports = function(app) {
 
    const price = require('../controller/itemPrice.controller');

    // Retrieve all Price
    app.get('/api/getAllPrice', price.findAll);

       // Create a new price
       app.post('/api/addNewPrice', price.create);
    //Update price
    app.put('/api/updatePrice/:priceId', price.update);
    //get item and price
    app.get('/api/getItemPrice/:itemId', price.getItemPrice);
    //Retrieve Price By Item Id
    app.get('/api/getPriceByItemId/:itemId', price.getPriceByItemId);
     //Retrieve price for varient by item id
     app.get('/api/price/getPriceForVarientByItemId/:itemId', price.getPriceForVarientByItemId);
    //Retrieve Price By price Id
    app.get('/api/getPriceById/:id', price.getPriceById);
    //Retrieve Item Stock By price Id
    app.post('/api/getItemStock', price.getItemStock);

    //Retrieve Item Stock in whole cart 
    app.post('/api/getItemStockInCart', price.getItemStockInCart);

}