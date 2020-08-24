const db = require('../config/db.config');
const OrderItem = db.tbl_orderitem;
const OrderUser = db.tbl_orderuser;
const sequelize = db.sequelize;
const {photoPath,itemPhotoPath} = require('../config/Global');
const Price = db.tbl_itemprice;
const fs = require('fs');


exports.setOrderItem = (req, res) => {

  var user = req.body.user;
  var item = req.body.item;
 
    OrderUser.create({
        userId: user.id,
        address: req.body.address,
        billingAddress:req.body.billingAddress,
        description: req.body.description,
        grandTotal:req.body.grandTotal

    }).then(u => {
      
        for ( var i = 0 ; i< item.length; i++)
        {
            
            OrderItem.create({
            priceId: item[i].priceId,
            orderItemId: item[i].itemId,
            orderUserId: u.id,
            itemQty: item[i].itemCount,
            totalPrice:item[i].amount,
            varientOneId:item[i].varientOneId,
            varientTwoId:item[i].varientTwoId
        }
        ).then(order => {
            res.send("success");
        });
    
}
      
    })
}

exports.getOrderUser = (req, res) => {
	var query = "SELECT u.id, u.userId,r.registerName, u.description,u.address,u.billingAddress FROM tbl_orderuser as u"+
    " inner join tbl_registeruser as r on r.id = u.userId";
	sequelize.query(query, {
		type: sequelize.QueryTypes.SELECT
	}).then(orderUser => {
		res.send(orderUser);
	})
}

exports.getItemPhoto = (req, res) => {
    var query ="SELECT ordItem.id ,photo.photoName,'item' as Status FROM tbl_orderitem as ordItem inner join"+
        " tbl_item as item on ordItem.orderItemId = item.id inner join"+
        " tbl_itemphoto as photo on photo.itemId = item.id where orderItemId="+req.body.itemId +" group by itemId"
        sequelize.query(query,{
            type:sequelize.QueryTypes.SELECT
        }).then(photo => {
            res.send(photo) 
        })
}


exports.getOrderPhoto = (req, res) => {
   
    if(req.body.voneId == null || req.body.vtwoId == null)
    {
     
        var query ="SELECT ordItem.id ,photo.photoName,'item' as Status FROM tbl_orderitem as ordItem inner join"+
        " tbl_item as item on ordItem.orderItemId = item.id inner join"+
        " tbl_itemphoto as photo on photo.itemId = item.id where orderItemId="+req.body.itemId +" group by itemId"
        sequelize.query(query,{
            type:sequelize.QueryTypes.SELECT
        }).then(photo => {
            res.send(photo) 
        })


    }
    else{
        var query ="SELECT ordItem.id , vone.varientOneImage,'varient' as Status  FROM tbl_orderitem as ordItem inner join"+
            " tbl_item as item on ordItem.orderItemId = item.id inner join"+
            " tbl_varientone as vone on item.id = vone.item inner join"+
            " tbl_varienttwo as vtwo on item.id = vtwo.item group by id"
            sequelize.query(query,{
                type:sequelize.QueryTypes.SELECT
            }).then(photo => {
                res.send(photo) 
            })
    }
}

exports.getOrderItem = (req, res) => {

    const id = req.params.id;
    var query = "SELECT   ordItem.id,ordItem.orderUserId,item.itemName,item.id as itemId, vone.id as voneId, vtwo.id as vtwoId,price.price,ordItem.totalPrice,ordItem.itemQty,vone.varientNameOne, vtwo.varientNameTwo"+
    " FROM tbl_orderitem as ordItem inner join"+
    " tbl_item as item on ordItem.orderItemId=item.id inner join"+
    " tbl_itemprice as price on ordItem.priceId = price.id left join"+
    " tbl_varientone as vone on vone.item = item.id left join" +
    " tbl_varienttwo as vtwo on vtwo.item = item.id where ordItem.orderUserId="+ id +" group by ordItem.id"
    
     sequelize.query(query,{
         type:sequelize.QueryTypes.SELECT
     }).then(orderItem => {
         res.send(orderItem)
     })
     
   
    // OrderItem.findAll( 
    // { where: {orderUserId:id} }
    //           ).then(item => {
    //              res.send(item)
               
    //           });  
}


exports.getOrderPhotoURL = (req, res) => {
    const fileName = req.params.fileName;
    const mimeType = fileName.split('.')[1];
    var staticResource=itemPhotoPath+fileName;
    fs.readFile(staticResource,(err, data)=> {
        if(err){
            console.log("Can't read file");
        }
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(data)
    });
 
};

exports.getOrderPhotoURLHasNoVarient = (req, res) => {
    const fileName = req.params.fileName;
    const mimeType = fileName.split('.')[1];
    var staticResource= itemPhotoPath +fileName;
    fs.readFile(staticResource,(err, data)=> {
        if(err){
            console.log("Can't read file");
        }
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(data)
    });
 
};