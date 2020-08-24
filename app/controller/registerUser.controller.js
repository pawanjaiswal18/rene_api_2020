const db = require('../config/db.config.js');
const RegisterUser = db.tbl_registeruser;
var nodemailer = require('nodemailer'); 
var path = require('path');
var Promise= require('bluebird')
const Email = require('email-templates');
var crypto =require('crypto');


//fetch register user

exports.getAllRegisterUser = (req, res) => {	

  RegisterUser.findAll().then(user => {
	
	  res.send(user);
	});

};

// Check Phone Have or Not 
exports.checkPhone = (req, res) => {	

   RegisterUser.findOne( 
    { where: {registerPhone:req.body.phone} }
              ).then(user => {
                   console.log(user)
                    res.send(user);
              });  

};
exports.checkUser = (req, res) => {	
 
     var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
  
     RegisterUser.findOne( 
          { where: {registerEmail:req.body.email,registerPassword:hash} }
                    ).then(user => {
                    
                      if(user === null){
                        let data ={
                          id:null,
                         
                        }
                            res.send(data);
                      }
                      else{
                        let data ={
                          id:user.id,
                          name:user.registerName
                        }
                            res.send(data);
                      }
                     
                    });  
 
 };

    //    var mailOptions = {
    //       from: 'khinmaykyaw317165@gmail.com',
    //       to: req.body.email,
    //       subject: 'Happy to see you as a Shal Zay Member',
    //       // text: 'Hello !'
        
    //     };
     
    //  transporter.sendMail(mailOptions, function(error, info){
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    //     }); 


//Add New Register User
exports.AddNewRegisterUser = (req, res) => {	
  console.log("newww")
  console.log(req.body.firstName)
  //    var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
  //    var transporter = nodemailer.createTransport({
  //         service: 'gmail',
  //         auth: {
  //           user: 'khinmaykyaw317165@gmail.com',
  //           pass: 'hellok2k'
  //         }
  //       });
  //       var mailOptions = {
  //         from: 'khinmaykyaw317165@gmail.com',
  //         to: req.body.email,
  //         subject: 'Happy to see you as a Shal Zay Member',
  //         // text: 'Hello !'
        
  //       };
     
  //    transporter.sendMail(mailOptions, function(error, info){
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log('Email sent: ' + info.response);
  //         }
  //       }); 


        
  //   var templateDir = path.join(__dirname ,"../",'templates','testMailTemplate')
  //   console.log('Hello'+templateDir)
  //  const testMailTemplate = new Email ({
  //    views: { root: templateDir}
  //  }) 
  //   var locals={
  //          userName:req.body.userName
  //        }
  //        testMailTemplate.render(locals, function(err,temp){
  //          console.log(temp)
  //          if(err){
  //            console.log('error',err);
  //          }
  //          else{
  //            transporter.sendMail({
  //              form:'khinmaykyaw317165@gmail.com',
  //              to:req.body.email,
  //              text:temp.text,
  //              html:temp.html
             
  //            },function(error, info){
  //              if(error){
  //               console.log(error);
  //              }
  //              console.log('message sent'+ info.response)
  //            })
  //          }
  //        })
         
  //         RegisterUser.create({  
  //            registerName: req.body.userName,
  //            registerEmail: req.body.email,
  //            registerPhone: req.body.phone,
  //            registerPassword: hash,
  //            registerUserPoint:10,
  //            creationUser:req.body.creationUser,

  //          }).then(user => {	

               
  //             res.send(user);
  //          });
 
 };


 exports.addNewUser = (req, res) => {	

  var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
  
       RegisterUser.create({  
          registerName: req.body.firstName +" "+ req.body.lastName,
          registerEmail: req.body.email,
          registerPhone: req.body.phone,
          registerPassword: hash,
          registerUserPoint:10,
          active:true

        }).then(user => {	
           let data ={
             id:user.id,
             name:user.registerName
           }
           res.send(data);
        });

};





