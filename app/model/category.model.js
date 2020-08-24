module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define('tbl_category', {
	 
      categoryName: {
		type: Sequelize.STRING
      },
      classsId:{
      type:Sequelize.INTEGER
      },
      description: {
		  type: Sequelize.STRING
      },
      categoryImage:{
        type: Sequelize.STRING
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
      updatedUser:{
        type: Sequelize.STRING
      },


    },
    {
       freezeTableName:true,
       tableName:'tbl_category'
 
});
	
	return Category;
}