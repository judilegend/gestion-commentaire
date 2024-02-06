const mongoose = require('mongoose')

const ConnectDB = async ()=>{
    try{    
        mongoose.set("strictQuery",false)
        mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo connecté ");
    }catch(e){
        console.log(e);
    }
}
module.exports = ConnectDB;