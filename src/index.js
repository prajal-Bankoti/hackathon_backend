const express=require("express")
const userControllrs=require("./controllers/user.controller")
const app=express()
app.use(express.json())
app.use("/user",userControllrs)
module.exports=app