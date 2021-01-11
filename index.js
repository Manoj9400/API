var mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var emailValidator = require("email-validator")
const app = express();
var port = 3000;
let detail = require("./model");

const router = express.Router();
require('dotenv').config()

app.use(bodyParser.json()); // for parsing application/json
//console.log(bodyParser)
app.use("/api", router);
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var uri = process.env.MONGOURI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  // console.log("MongoDB database connection established successfully");
});


 if (emailValidator.validate("test@email.com")){
   console.log("Email is valid")
 }else{
   console.log("Email is Invalid")
 }

router.route("/insertdata").post(function(req, response) {
   //console.log(req)
  //console.log(req.body.age)
  var email = req.body.email
  var name = req.body.name
  var age = req.body.age
  var breed = req.body.breed
  if(!email){
    return response.status(400).json({sucess:false ,message:"Email required."})
  }  
  
  var myobj = { name:name, age:age, breed:breed, email:email };
  
  detail.create(myobj, function(err, res) {
    console.log('Analyzing Data...');
    detail.find({email:req.body.email}).then(res => {
      // console.log(res)
    if(res.length!=0) {
        console.log('Your data has been successfully saved.');
        //return response.json({data:res});
        return response.json({
          data:[],
          success:false,
          msg:"Email Exist"
        })
    }
    else{
      detail.create(myobj)
      console.log('Something went wrong while saving data.');
      console.log(err);
      //response.send(err);
      return response.json({
      data:[],
          success:true,
          msg:"Registered Successfuly"
      })
    }
})
  })
});


router.route("/get_data").get(function(req, res) {
  detail.find(
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route("/single_data").post(function(req, res) {
  // console.log(req.{}.name);
  name = req.param('name')
  console.log(name)
 
  detail.findOne({name:name}).exec(function (err, data){
    return res.json(data)
  })
});

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});