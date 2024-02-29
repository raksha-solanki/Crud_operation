var express = require('express');
var router = express.Router();
var usermodel = require("./users");
var mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/p', async function(req,res,next){
  var user = await usermodel.create({
    username: req.body.username,
    mail: req.body.mail,
    pic: req.body.pic,
  })
  console.log(user);
  res.redirect(`/feed/${user.username }`);
})

router.get('/feed',async function(req, res, next) {
 var alluser = await usermodel.find()
 res.render('feed',{users: alluser}) 
});

router.get('/delete/:id',async function(req, res, next) {
  var userdlt = await usermodel.findOneAndDelete({_id:req.params.id})
  res.redirect("/feed"); 
 });
 
 router.get('/edit/:id',async function(req, res, next) {
  var useredit = await usermodel.findOne({_id:req.params.id})
  res.render("edit",{useredit}); 
 });

 router.post('/update/:id',async function(req, res, next) {
  var useredit = await usermodel.findOneAndUpdate({_id: req.params.id},{
    username: req.body.username,
    mail: req.body.mail,
    pic: req.body.pic,
  })
  res.redirect("/feed"); 
 });

 router.get('/feed/:username',async function(req, res, next) {
  var alluser = await usermodel.find()
  var currentusername = await usermodel.findOne({
    username :req.params.username})

    res.render('feed',{users: alluser,loggedin: currentusername}) 
 });
 

 router.get('/like/:id/:currentusername',async function(req, res, next) {
  var likeuser = await usermodel.findOne({
    _id:req.params.id
  })
  var loggedin = await usermodel.findOne({
    _id:req.params.currentusername
  })

  likeuser.likes.push(loggedin._id)
  await likeuser.save()
  res.redirect(`/feed/${req.params.currentusername}`)

 });
 

module.exports = router;
