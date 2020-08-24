module.exports = (sequelize, Sequelize) => {
	const VarientOne = sequelize.define('tbl_varientone', {
	  item: {
		type: Sequelize.INTEGER
      },
     varientOneImage: {
       type: Sequelize.STRING
     },
      varientGroupNameOne:{
        type: Sequelize.STRING
      },
      varientNameOne:{
          type:Sequelize.STRING
      },
      updatedUser:{
        type: Sequelize.STRING
      },
      creationUser:{
        type: Sequelize.STRING
      },
    },
    {
      freezeTableName:true,
      tableName:'tbl_varientone'

});
	
	return VarientOne;
}