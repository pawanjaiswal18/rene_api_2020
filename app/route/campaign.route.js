module.exports = function(app) {
 
    const campaign = require('../controller/campaign.controller.js');
    const upload = require('../config/multer.config');
 
    // Create a new Campaign
    app.post('/api/addNewCampaign',upload.single('uploadfile'), campaign.create);
    // Show Profile Photo Path
    app.get('/api/getCampaignPhotoPath/:fileName',campaign.getPhotoPath);
    // Retrieve all Campaign
    app.get('/api/getAllCampaign', campaign.findAll);
    //Retrieve campaign for select 
    app.get('/api/getCampaignSelect',campaign.findCampaignSelect);
    // Update a Campaign with Id
    app.put('/api/updateCampaign/:campaignId',upload.single('uploadfile'), campaign.update);
    //Retrieve all Campaign by active
    app.get('/api/getCampaignByActive',campaign.findAllByActive);

}