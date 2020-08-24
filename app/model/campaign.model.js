module.exports = (sequelize, Sequelize) => {
	const Campaign = sequelize.define('tbl_campaign', {
	  campaignName: {
		type: Sequelize.STRING
      },
      headerLine1: {
		type: Sequelize.STRING
      },
      bannerImage:{
        type:Sequelize.STRING
      },
      headerLine2: {
		type: Sequelize.STRING
      },
      startDate: {
		type: Sequelize.DATE
      },
      endDate: {
		type: Sequelize.DATE
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
      description:{
        type: Sequelize.STRING
      }
	},
   {
      freezeTableName:true,
      tableName:'tbl_campaign'

});
	
	return Campaign;
}