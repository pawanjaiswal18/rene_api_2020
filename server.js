var express = require('express');
var app = express();
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var fs = require('fs');
var  options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
var https = require('https');



var cors=require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('view engine', 'ejs');


const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: true }');
});

//app.use('/',testing);

require('./app/route/city.route.js')(app);
require('./app/route/adminUser.route.js')(app);
require('./app/route/supplier.route.js')(app);
require('./app/route/campaign.route.js')(app);
require('./app/route/classs.route.js')(app);
require('./app/route/ocassion.route.js')(app);
require('./app/route/category.route.js')(app);
require('./app/route/item.route.js')(app);
require('./app/route/varient.route.js')(app);
require('./app/route/testing.route.js')(app);
require('./app/route/orderItem.route.js')(app);
require('./app/route/itemPrice.route.js')(app);
require('./app/route/registerUser.route.js')(app);
require('./app/route/brand.route.js')(app);
require('./app/route/shippingFee.route.js')(app);
require('./app/route/subscriber.route.js')(app);
require('./app/route/discountCoupon.route.js')(app);
require('./app/route/yourConfidence.route.js')(app);

// Create a Server
var server = https.createServer(options, app).listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})