const mongoose=require('mongoose')
const swasthyaschema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const swasthyaModel=mongoose.model("swasthy",swasthyaschema)
module.exports={swasthyaModel}