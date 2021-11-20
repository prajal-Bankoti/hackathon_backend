const mongoose = require("mongoose");
var bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String  },
    img: { type: String},
    roles: { type: String},
    phone: { type:String,required:true},
    addarCard:{type:String},
    vicNo:{type:String}
  },
  { versionKey: false }
);

const User = mongoose.model("datauser", userSchema);

module.exports = User;
