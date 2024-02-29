var mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/likemongo").then(result =>{
  console.log("connect to db");
}).catch(err =>{
  console.log(err);
})

var userschema = mongoose.Schema({
  username:String,
  mail:String,
  pic: String,
  likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }]
});

module.exports = mongoose.model('user',userschema)