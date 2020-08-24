module.exports = (sequelize, Sequelize) => {
    const YourConfidence = sequelize.define('tbl_your_confidence', {


            modelImage:{
                type: Sequelize.STRING
            },
            modelName:{
                type: Sequelize.STRING
            },
        },
        {
            freezeTableName:true,
            tableName:'tbl_your_confidence'

        });

    return YourConfidence;
}