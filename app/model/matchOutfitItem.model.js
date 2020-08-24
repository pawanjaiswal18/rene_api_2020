module.exports = (sequelize, Sequelize) => {
	const matchOutfitItem = sequelize.define('tbl_matchoutfititem', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        itemId:{
        type:Sequelize.INTEGER
        },
        matchItemId:{
            type:Sequelize.INTEGER
            },
         
     
   },
   {
     freezeTableName:true,
     tableName:'tbl_matchoutfititem'

});
	return matchOutfitItem;
}