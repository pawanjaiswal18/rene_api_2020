module.exports = function(app) {
 
    const registerUser = require('../controller/registerUser.controller');

    
    //Check phone of register user 
    app.post ('/api/registerUser/checkPhone', registerUser.checkPhone);

    //Add New a Register Member
    app.post('/api/registerUser/AddNewRegisterUser', registerUser.AddNewRegisterUser);

    //check User Register
    app.post('/api/registerUser/isUser',registerUser.checkUser);

    //Fetch Register
    app.get('/api/getAllRegisterUser',registerUser.getAllRegisterUser);

    app.post('/api/registerUser/addNewUser', registerUser.addNewUser);
    
    app.post('/api/registerUser/checkAccount', registerUser.checkUser);
}
 