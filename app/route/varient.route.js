module.exports = function (app) {

  const varient = require('../controller/varient.controller.js');
  const upload = require('../config/multer.config');
  
  //Cretate a new Varient One
  app.post('/api/addNewVarientOne',upload.single('uploadfile'),varient.createVarientOne);
  // Show Varient One Photo Path
  app.get('/api/getVarientPhotoPath/:fileName', varient.getPhotoPath);
  // Retrieve all Varient One
  app.get('/api/getAllVarientOne', varient.varientOneFindAll);
//Retrieve varient Two By Item
  app.get('/api/getVarientTwoByItem/:itemId',varient.getVarientTwoByItem);
//Retrieve varient One By Item
app.get('/api/getVarientOneByItem/:itemId',varient.getVarientOneByItem);
  // Update a Varient with Id
  app.put('/api/updateVarientOne/:varientId', upload.single('uploadfile'), varient.updateVarientOne);
   //Cretate a new Varient Two
   app.post('/api/addNewVarientTwo',varient.createVarientTwo);
     // Retrieve all Varient Two
  app.get('/api/getAllVarientTwo', varient.varientTwoFindAll);
  // Update a Varient with Id
  app.put('/api/updateVarientTwo/:varientId', varient.updateVarientTwo);
  //Retrieve varient with price
  app.get('/api/getVarientWithPrice/:itemId', varient.getVarientWithPrice);
 
//   //Retrieve all Varient by Item Id
//   app.get('/api/getVarientByItemId/:itemId', varient.getVarientByItemId);
//   //Retrieve all Varient By GroupName
//   app.get('/api/getVareintByGroup/:varientName', varient.getVareintByGroup);
  
 }