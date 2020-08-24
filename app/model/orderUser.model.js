module.exports = (sequelize, Sequelize) => {

    const orderUser = sequelize.define('tbl_orderuser', {
    
        userId: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.STRING
        },
        billingAddress:{
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        grandTotal:{
            type:Sequelize.DOUBLE
        },

    },
        {
            freezeTableName: true,
            tableName: 'tbl_orderuser'
        });
    return orderUser;
}