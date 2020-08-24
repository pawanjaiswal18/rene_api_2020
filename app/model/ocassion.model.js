module.exports = (sequelize, Sequelize) => {
    const Ocassion = sequelize.define('tbl_ocassion', {

            ocassionName: {
                type: Sequelize.STRING
            },

            description: {
                type: Sequelize.STRING
            },
            ocassionImage:{
                type: Sequelize.STRING
            },
            creationUser:{
                type: Sequelize.STRING
            },
            active:{
                type: Sequelize.BOOLEAN
            },
            isHomeDisplay:{
                type:Sequelize.BOOLEAN
            },
            updatedUser:{
                type: Sequelize.STRING
            },


        },
        {
            freezeTableName:true,
            tableName:'tbl_ocassion'

        });

    return Ocassion;
}