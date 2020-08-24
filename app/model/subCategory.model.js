module.exports = (sequelize, Sequelize) => {
	const SubCategory = sequelize.define('tbl_subcategory', {
     
      subCategoryName: {
		type: Sequelize.STRING
      },
      mainCategoryId:{
          type:Sequelize.INTEGER
      },
      description: {
		  type: Sequelize.STRING
      },
      
      creationUser:{
        type: Sequelize.INTEGER
      },
      isHomeDisplay:{
        type:Sequelize.BOOLEAN
      },
      active:{
        type: Sequelize.BOOLEAN
    },
      updatedUser:{
        type: Sequelize.INTEGER
      },

    },
    {
       freezeTableName:true,
       tableName:'tbl_subcategory'
 
});
	
	return SubCategory;
}