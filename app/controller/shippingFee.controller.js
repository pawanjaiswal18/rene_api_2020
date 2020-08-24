const db = require('../config/db.config.js');
const ShippingFee = db.tbl_shippingFee;
const sequelize = db.sequelize;

// Post a shipping Fee
exports.create = (req, res) => {	

	ShippingFee.create({  
        shipCity: req.body.shipCity,
        shipItem:req.body.shipItem,
        creationUser:req.body.creationUser,
        shippingFee: req.body.shippingFee,
        active:req.body.active
      }).then(fee => {		
        
          res.send(fee);
      });
	
};

exports.getShippingFeeByItemAndCity =(req,res) => {
    
    var cityId = req.body.cityId
    var orderItem = JSON.parse(req.body.orderItem)
    console.log(orderItem)
    var query = "SELECT id, max(shippingFee) as shipFee FROM shal_zay.tbl_shippingfee";
    var where = " where shipCity=" + cityId + " and (";
    for(var i=0; i < orderItem.length; i++)
    {        
        if(i == 0){
            where = where + " shipItem ="+orderItem[i].itemId ;
        }
        else{
            where = where + " or shipItem ="+orderItem[i].itemId ;
        }
    }
    where = where + ")";
        sequelize.query(query + where , {
            type: sequelize.QueryTypes.SELECT
        }).then(fee => {
            console.log(fee)
            res.send(fee)
            // res.send(fee[0].shipFee)
            // if(fee.length  > 1 )
            // {
            //     var array=[];
            //     array.push(fee.shippingFee);
            //     console.log(array)

            // }
            // else{
            //     res.send(fee.shippingFee)
            // }
         
        })
    }



exports.findAll = (req, res) => {
	ShippingFee.findAll().then(fee => {
     res.send(fee);
	});
};

exports.getshipFeeTable = ( req, res) => {
    var query = "SELECT fee.id,fee.shipItem  as shipItemId, item.itemName as shipItemName,fee.shipCity as shipCityId, city.cityName as shipCityName, fee.shippingFee, fee.creationUser, fee.active, fee.updatedUser,fee.createdAt"
    +" FROM shal_zay.tbl_shippingfee as fee inner join"
    +" shal_zay.tbl_item as item on fee.shipItem=item.id inner join"
    +" shal_zay.tbl_city as city on city.id=fee.shipCity group by fee.id";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(fee => {
		res.send(fee)
	})
}

exports.update = (req, res) => {
    const id = req.params.shipId;
	ShippingFee.update( { shipCity: req.body.shipCity, shipItem : req.body.shipItem, shippingFee: req.body.shippingFee ,active: req.body.active,updatedUser: req.body.updatedUser }, 
					 { where: {id: id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a city with id = " + id);
				   });
};
