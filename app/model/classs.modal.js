module.exports = (sequelize, Sequelize) => {
    const Classs = sequelize.define('tbl_classs', {

            classsName: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            creationUser:{
                type: Sequelize.STRING
            },
            active:{
                type: Sequelize.BOOLEAN
            },
            updatedUser:{
                type: Sequelize.STRING
            },


        },
        {
            freezeTableName:true,
            tableName:'tbl_classs'

        });

    return Classs;
}