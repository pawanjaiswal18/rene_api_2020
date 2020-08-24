module.exports = (sequelize, Sequelize) => {
	const couponType = sequelize.define('tbl_coupontype', {
	  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      couponTypeName: {
		type: Sequelize.STRING
      }
     
   },
   {
     freezeTableName:true,
     tableName:'tbl_coupontype'

});
	
	return couponType;
}