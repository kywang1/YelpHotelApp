//EXPORTS THE HOTEL TO APP
var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
   name:String,
   location: String,
   image:String,
   description:String,
   comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }   
    ]
}); 


module.exports = mongoose.model("Hotel",hotelSchema);