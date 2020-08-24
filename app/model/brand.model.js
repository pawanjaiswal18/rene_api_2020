module.exports = (sequelize, Sequelize) => {
	const Brand = sequelize.define('tbl_brand', {
	  brandNameMM: {
		type: Sequelize.STRING
      },
      brandNameEg: {
		type: Sequelize.STRING
      },
      description: {
		  type: Sequelize.STRING
      },
      brandImage:{
        type: Sequelize.STRING
      },
      creationUser:{
        type: Sequelize.STRING
      },
      active:{
        type: Sequelize.BOOLEAN
    },
      updatedUser:{
        type: Sequelize.STRING
      },

    },
    {
       freezeTableName:true,
       tableName:'tbl_brand'
 
});
	
	return Brand;
}