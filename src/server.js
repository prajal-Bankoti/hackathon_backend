const app=require("./index")
const connect =require("./configs/db")
app.listen(2222,async function(){
    await connect()
    console.log("listing port 2222")
})