var mongoose = require("mongoose");
const express = require("express");
const app = express();
var port = 3000;
let detail = require("./model");
const router = express.Router();

app.use("/api", router);


var uri = "mongodb://127.0.0.1:27017/book";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  // console.log("MongoDB database connection established successfully");
});


router.route("/insertdata").post(function(req, res) {
  detail.insertMany(
    [
      { name: "Scooby" },
      { age: 5 },
      { breed: "Great Dane" },
      { name: "Rambo" },
      { age: 2 },
      { breed: "Pitbull" },
      { name: "Johny boy" },
      { age: 3 },
      { breed: "German Shephard" }
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
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