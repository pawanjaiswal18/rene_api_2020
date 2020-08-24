module.exports = function(app) {
 
    const discount = require('../controller/discountCoupon.controller');

    // Retrieve all Price
    app.get('/api/getCouponType', discount.getCouponType);
    app.get('/api/getDiscountCoupon', discount.getDiscountCoupon);
    app.post('/api/addNewDiscountCoupon',discount.addNewDiscountCoupon);
    app.put('/api/updateDiscountCoupon/:id',discount.updateDiscountCoupon);
    app.get('/api/checkCouponCode/:code',discount.checkCouponCode);


  

}