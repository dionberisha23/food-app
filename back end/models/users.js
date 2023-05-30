const mongoose = require("mongoose")



const schema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "name must not be empty"]
        
    },
    email : {
        type : String,
        required : true,
        unique : true
        
    },
    password : {
        type : String,
        required : true
        
    },
    phone : {
        type : Number,
        required : true
    },
    token : {
        type : String

    }

})

const userModel = mongoose.model("users", schema);



module.exports = userModel;