module.exports = function (app) {

  const item = require('../controller/item.controller.js');
  // Create a new Item
  app.post('/api/addNewItem', item.create);
  // Retrieve all Item
  app.get('/api/getAllItem', item.findAll);
  //get Item for Home Page Default is New Arrival

  app.get('/api/getMatchItemByCategoryId/:id',item.getMatchItemByCategoryId)
  app.get('/api/findByOcassion/:id',item.findByOcassion)
  app.get('/api/getMatchItemByMainCategoryId/:id',item.getMatchItemByMainCategoryId)
    //get Item for Home Page
  app.get('/api/getBestSellingItem',item.getBestSellingItem)
  app.get('/api/getNewArrivalItem',item.getNewArrivalItem)
  app.get('/api/getItemHome',item.getItemHome)
    //get Item for Home Page
  app.get('/api/getPromotionItem',item.getPromotionItem)


  // Update a Item with Id
  app.put('/api/updateItem/:itemId', item.update);
  //Retrieve all Item by active
  app.get('/api/getItemByActive', item.findAllByActive);
  // Retrieve a single Item by Id
  app.get('/api/getItemById/:itemId', item.findById);
  
  app.get('/api/getItemViewById/:itemId', item.getItemViewById);
  //Retrieve Item Photo By Id
  app.get('/api/getItemPhotoById/:itemId', item.findPhotoById);
  // Show Item Photo Path
  app.get('/api/getItemPhotoPath/:fileName', item.getPhotoPath);
  //Retrieve a single item photo by Id
  app.get('/api/getOneItemPhoto/:itemId', item.findOnePhotoByItemId);
  //retrieve related item depend on subcategory
  app.get('/api/getRelatedItem/:categoryId/:itemId', item.getRelatedItem);
  // get Item list by Category Id
  app.get('/api/getItemListByCategory/:category', item.getItemListByCategory);

  //get Item List by Campaign Id 
  app.get('/api/getItemListByCampaign/:campaign', item.getItemListByCampaign);

   //get Item with Price by active
   app.get('/api/item/getItemWithPriceByActive', item.getItemWithPriceByActive);

   //get lowest price item
   app.get('/api/item/getLowestPriceItem', item.getLowestPriceItem);
   //get highest price item
   app.get('/api/item/getHighestPriceItem', item.getHighestPriceItem);
   //get popular item
   app.get('/api/item/getPopularItem', item.getPopularItem);
   //get Check Out Item Data
   app.post('/api/getCheckOutItem', item.getCheckOutItem);
   //get Item for multiple select
   app.get('/api/item/getItemSelect', item.getItemSelect);
   app.get('/api/item/getItemSelectNotIncluded/:itemId', item.getItemSelectNotIncluded);
   app.get('/api/getMatchItem/:id',item.getMatchItem)
   app.get('/api/getMachItemById/:id',item.getMatchItemById)
   


}