module.exports = (sequelize, Sequelize) => {
	const Varient = sequelize.define('tbl_varient', {
	  item: {
		type: Sequelize.INTEGER
      },
     varientOneImage: {
       type: Sequelize.STRING
     },
      quantity: {
		type: Sequelize.INTEGER
      },
      price: {
		type: Sequelize.DOUBLE
      },
      discountPrice:{
        type: Sequelize.DOUBLE
      },
      varientGroupNameOne:{
        type: Sequelize.STRING
      },
      varientNameOne:{
          type:Sequelize.STRING
      },
      varientGroupNameTwo:{
          type:Sequelize.STRING
      },
      varientNameTwo:{
        type:Sequelize.STRING
      },
      description:{
        type:Sequelize.STRING
      },
      updatedUser:{
        type: Sequelize.STRING
      },
    },
    {
      freezeTableName:true,
      tableName:'tbl_varient'

});
	return Varient;
}