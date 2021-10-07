const mongo = require('mongoose');
const Schema = mongo.Schema;
const UserSchame = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    identifier:{
        type:String,
        required:true
    }
})
module.exports = userMsg = mongo.model("user",UserSchame);