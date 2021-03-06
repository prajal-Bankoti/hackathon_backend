const express=require("express")
const userControllrs=require("./controllers/user.controller")
const app=express()

app.use(express.json())
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use("/user",userControllrs)
module.exports=app