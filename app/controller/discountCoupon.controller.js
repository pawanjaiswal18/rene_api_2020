const db = require('../config/db.config.js');
const sequelize = db.sequelize;
const  path  = require('../config/Global');
const couponType = db.tbl_coupontype;
const coupon = db.tbl_discountcoupon;

exports.getCouponType = (req, res) => {
	let query = `SELECT id as value, couponTypeName as label FROM tbl_coupontype `; 
    
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list)
        })
 }

 exports.getDiscountCoupon = (req, res) => {
    let query = `SELECT  a.*, b.couponTypeName from tbl_discountcoupon as a inner join tbl_coupontype as b on 
    a.couponTypeId = b.id where active = true `; 
    
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list)
        })
 }
 
 

exports.addNewDiscountCoupon = (req, res) => {

    coupon.create({
        couponName: req.body.couponName,
        couponCode: req.body.couponCode,
        couponTypeId:req.body.couponTypeId,
        amount: req.body.amount,
        active: true

    }).then(coupon => {

        res.send(coupon);
    });

};

exports.updateDiscountCoupon = (req, res) => {
    const id = req.params.id;
   
		coupon.update({ couponName: req.body.couponName, couponCode:req.body.couponCode,
			 couponTypeId: req.body.couponType,amount:req.body.amount, active: req.body.active, updatedUser:req.body.updatedUser },
			{ where: { id: id } }
		).then((coupon) => {
        
			res.status(200).send("updated successfully a coupon with id = " + id);
		});
    }

    exports.checkCouponCode = (req, res) => {
        const code = req.params.code;
        let query = `SELECT amount,couponTypeId FROM tbl_discountcoupon where couponCode = '`+code + `' and active = true `; 
         
        sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        })
            .then(list => {
             
                    res.send(list)
              
               
            })
           
        }









