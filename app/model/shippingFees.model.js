module.exports = (sequelize, Sequelize) => {
	const ShippingFee = sequelize.define('tbl_shippingFee', {
	  shipItem: {
		type: Sequelize.INTEGER
      },
      shipCity: {
		type: Sequelize.INTEGER
      },
      shippingFee: {
		type: Sequelize.DOUBLE
      },
      creationUser:{
        type: Sequelize.STRING
      },
      active:{
          type:Sequelize.BOOLEAN
      },
      updatedUser:{
        type: Sequelize.STRING
      },
   },
   {
     freezeTableName:true,
     tableName:'tbl_shippingFee'

});
	
	return ShippingFee;
}