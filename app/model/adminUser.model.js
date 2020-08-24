module.exports = (sequelize, Sequelize) => {
	const AdminUser = sequelize.define('tbl_adminuser', {
	  userName: {
		type: Sequelize.STRING
      },
      email: {
		type: Sequelize.STRING
      },
      phone: {
		type: Sequelize.STRING
      },
      gender: {
		type: Sequelize.STRING
      },
      address: {
		type: Sequelize.STRING
      },
      password: {
		type: Sequelize.STRING
      },
      creationUser:{
          type:Sequelize.STRING
      },
      updatedUser:{
        type: Sequelize.STRING
      },
      active:{
          type: Sequelize.BOOLEAN
      },
      profileImage:{
        type: Sequelize.STRING
      }
   },
      {
         freezeTableName:true,
         tableName:'tbl_adminuser'
   
	});
	
	return AdminUser;
}