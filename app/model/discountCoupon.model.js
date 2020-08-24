module.exports = (sequelize, Sequelize) => {
	const discountCoupon = sequelize.define('tbl_discountcoupon', {
	  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      couponName: {
		type: Sequelize.STRING
      },
      couponCode:{
        type: Sequelize.STRING
      },
      couponTypeId:{
        type: Sequelize.INTEGER
      },
      amount:{
          type:Sequelize.DOUBLE
      },
      active:{
        type:Sequelize.BOOLEAN
      }
     
   },
   {
     freezeTableName:true,
     tableName:'tbl_discountcoupon'

});
	
	return discountCoupon;
}