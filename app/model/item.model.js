module.exports = (sequelize, Sequelize) => {
	const Item = sequelize.define('tbl_item', {
   
	  itemName: {
		type: Sequelize.STRING
      },
     ocassionId:{
     type:Sequelize.INTEGER
     },
      shortName: {
		type: Sequelize.STRING
      },
      shortNote: {
		type: Sequelize.STRING
      },
      description: {
		type: Sequelize.STRING
      },
      categoryId: {
		type: Sequelize.INTEGER
      },
      creationUser:{
        type: Sequelize.STRING
      },
      active:{
        type: Sequelize.BOOLEAN
    },
    isHomeDisplay:{
      type:Sequelize.BOOLEAN
    },
    isPromotion:{
      type:Sequelize.BOOLEAN
    },
    isNewArrival:{type:Sequelize.BOOLEAN},
    isBestSelling:{type:Sequelize.BOOLEAN},
      updatedUser:{
        type: Sequelize.STRING
      },
      // itemPhoto:{
      //   type:DataTypes.ARRAY(Sequelize.STRING)
      // }
    },
    {
      freezeTableName:true,
      tableName:'tbl_item'

});
	
	return Item;
}