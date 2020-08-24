module.exports = (sequelize, Sequelize) => {
	const itemPhoto = sequelize.define('tbl_itemphoto', {
        itemId:{
        type:Sequelize.INTEGER
        },
      photoName: {
		type: Sequelize.STRING
      },
   },
   {
     freezeTableName:true,
     tableName:'tbl_itemphoto'

});
	return itemPhoto;
}