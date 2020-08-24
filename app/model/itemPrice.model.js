const db = require('../config/db.config.js');
const varientOne = db.tbl_varientOne;
module.exports = (sequelize, Sequelize) => {
	const itemPrice = sequelize.define('tbl_itemprice', {
	  item: {
		type: Sequelize.INTEGER
      },
      
      price:{
        type: Sequelize.DOUBLE
      },
   
      quantity:{
          type:Sequelize.INTEGER
      },
      itemCode:{
        type:Sequelize.INTEGER
       },
    varientOne:{
        type:Sequelize.INTEGER
    },
    varientTwo:{
        type:Sequelize.INTEGER
    },
    creationUser:{
        type:Sequelize.STRING
    },
    updatedUser:{
      type: Sequelize.STRING
    },
},
{
  freezeTableName:true,
  tableName:'tbl_itemprice'

});
	
    return itemPrice;

}