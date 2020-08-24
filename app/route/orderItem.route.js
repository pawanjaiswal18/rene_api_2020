module.exports = function (app) {
    const orderItem = require('../controller/orderItem.controller.js');
    

    //set new order item 
    app.post('/api/setOrderItem', orderItem.setOrderItem);

    //get order user list
    app.get('/api/getOrderUser',orderItem.getOrderUser);

    //get order item list
    app.get('/api/getOrderItem/:id',orderItem.getOrderItem);

    //get order photo 
    app.post('/api/getOrderPhoto', orderItem.getItemPhoto);

    //get Order Photo URL With Varient
     app.get('/api/getOrderPhotoURL/:fileName', orderItem.getOrderPhotoURL);
    //get Order Photo URL With No Varient
    
    app.get('/api/getOrderPhotoURLHasNoVarient/:fileName', orderItem.getOrderPhotoURLHasNoVarient);

}
