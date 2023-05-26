const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name : {
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
        
    }
})

const User = mongoose.model("users", schema);


module.exports = User;