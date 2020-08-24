module.exports = (sequelize, Sequelize) => {
	const VarientTwo = sequelize.define('tbl_varienttwo', {
	  item: {
		type: Sequelize.INTEGER
      },
      varientGroupNameTwo:{
        type: Sequelize.STRING
      },
      varientNameTwo:{
          type:Sequelize.STRING
      },
      creationUser:{
        type: Sequelize.STRING
      },
      updatedUser:{
        type: Sequelize.STRING
      },
    },
    {
      freezeTableName:true,
      tableName:'tbl_varienttwo'

});
	
	return VarientTwo;
}