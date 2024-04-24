const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    fullname:{
        type: String,
    },
    password:{
        type: String
    }
},{timestamps: true})


module.exports=mongoose.model('user',userSchema)