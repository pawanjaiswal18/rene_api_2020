module.exports = (sequelize, Sequelize) => {
    const orderItem = sequelize.define('tbl_orderitem', {
        priceId: {
            type: Sequelize.INTEGER
        },
        orderItemId: {
            type: Sequelize.INTEGER
        },
        orderUserId: {
            type: Sequelize.INTEGER
        },
        itemQty: {
            type: Sequelize.INTEGER
        },
        totalPrice: {
            type: Sequelize.DOUBLE
        },
        varientOneId: {
            type: Sequelize.INTEGER
        },
        varientTwoId:{
            type:Sequelize.INTEGER
        }
    },
        {
            freezeTableName: true,
            tableName: 'tbl_orderitem'// to fix table
        });

    return orderItem;
}
