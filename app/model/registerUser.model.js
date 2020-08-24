module.exports = (sequelize, Sequelize) => {
	const RegisterUser = sequelize.define('tbl_registeruser', {
	  registerName: {
		type: Sequelize.STRING
      },
      registerEmail: {
		type: Sequelize.STRING
      },
      registerPhone: {
		type: Sequelize.STRING
      },
      registerPassword: {
		type: Sequelize.STRING
      },
      registerUserPoint:{
         type:Sequelize.DOUBLE
      },
      updatedUser:{
        type: Sequelize.STRING
      },
      active:{
          type: Sequelize.BOOLEAN
      },
   },
   {
     freezeTableName:true,
     tableName:'tbl_registeruser'

});
	return RegisterUser;
}