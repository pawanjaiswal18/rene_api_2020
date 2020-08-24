module.exports = (sequelize, Sequelize) => {
	const City = sequelize.define('tbl_city', {
	  cityName: {
		type: Sequelize.STRING
      },
      creationUser:{
        type: Sequelize.STRING
      },
      updatedUser:{
        type: Sequelize.STRING
      }
    },
      {
        freezeTableName:true,
        tableName:'tbl_city'
  
 });
   
	return City;
}