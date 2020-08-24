var express = require('express');
var app = express();
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));


var cors=require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('view engine', 'ejs');

const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
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
 https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000);