const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    route1: { type: String, required: true },
    route2: { type: String, required: true },
    material: { type: String, required: true },
    price:{type:Number,required:true},
    vehicaleC: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    book:{type:Object}

   
  },
  { versionKey: false }
);
module.exports = mongoose.model("customer", studentSchema);
