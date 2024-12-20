const mongoose = require('mongoose')

const testimonyModelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    }
    
})

const testimonials = mongoose.model("testimonials", testimonyModelSchema)
module.exports = testimonials
