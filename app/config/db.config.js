const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.tbl_city = require('../model/city.model.js')(sequelize, Sequelize);
db.tbl_adminuser = require('../model/adminUser.model.js')(sequelize, Sequelize);
db.tbl_supplier = require('../model/supplier.model.js')(sequelize, Sequelize);
db.tbl_campaign = require('../model/campaign.model.js')(sequelize, Sequelize);
db.tbl_classs = require('../model/classs.modal.js')(sequelize, Sequelize);
db.tbl_classs = require('../model/ocassion.model.js')(sequelize, Sequelize);
db.tbl_category = require('../model/category.model.js')(sequelize, Sequelize);
db.tbl_item = require('../model/item.model.js')(sequelize, Sequelize);
db.tbl_subcategory =require('../model/subCategory.model.js')(sequelize, Sequelize);
db.tbl_varientone = require('../model/varientOne.model.js')(sequelize, Sequelize);
db.tbl_varienttwo = require('../model/varientTwo.model.js')(sequelize, Sequelize);
db.tbl_itemprice= require('../model/itemPrice.model.js') (sequelize, Sequelize);
db.tbl_itemphoto = require('../model/itemPhoto.model.js')(sequelize, Sequelize);
db.tbl_registeruser = require('../model/registerUser.model')(sequelize, Sequelize);
db.tbl_orderuser = require('../model/orderUser.model') (sequelize , Sequelize);
db.tbl_orderitem = require('../model/orderItem.model.js')(sequelize, Sequelize);
db.tbl_brand = require('../model/brand.model.js')(sequelize,Sequelize);
db.tbl_shippingFee =require('../model/shippingFees.model.js')(sequelize,Sequelize);
db.tbl_matchoutfititem = require('../model/matchOutfitItem.model') (sequelize, Sequelize);
db.tbl_coupontype = require('../model/couponType.model') (sequelize, Sequelize);
db.tbl_discountcoupon = require('../model/discountCoupon.model') (sequelize, Sequelize);
db.tbl_your_confidence = require('../model/yourConfidence.model') (sequelize, Sequelize);
//Relations
// db.tbl_item.hasMany(db.tbl_itemprice, { foreignKey: 'item' });
// db.tbl_item.hasMany(db.tbl_varientone, { foreignKey: 'item' });
// db.tbl_varienttwo.belongsTo(db.tbl_item, { foreignKey: 'item',targetKey: 'id' });
// db.tbl_varientone.hasMany(db.tbl_itemprice, { foreignKey: 'varientOne' });
// db.tbl_itemprice.belongsTo(db.tbl_varienttwo, { foreignKey: 'varientTwo', targetKey: 'id' });

module.exports = db;