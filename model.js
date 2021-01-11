
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let detail = new Schema({
  email:{
    type: String,
    required: true  
  },
  name: {
    type: String,
    required: "Enter Name"
  },
  age: {
    type: Number,
    required: true
  },
  breed: {
    type: String
  }
});

module.exports = mongoose.model("detail", detail);