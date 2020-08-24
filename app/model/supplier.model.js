module.exports = (sequelize, Sequelize) => {
	const Supplier = sequelize.define('tbl_supplier', {
	  supplierName: {
		type: Sequelize.STRING
      },
      phone: {
		type: Sequelize.STRING
      },
      email: {
		type: Sequelize.STRING
      },
      address: {
		type: Sequelize.STRING
      },
      description: {
		type: Sequelize.STRING
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
     tableName:'tbl_supplier'

});
	
	return Supplier;
}