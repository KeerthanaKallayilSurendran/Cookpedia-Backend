const mongoose = require('mongoose')

const userModelSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    profileImg:{
        type:String
    }
})

const users = mongoose.model("users", userModelSchema)
module.exports = users