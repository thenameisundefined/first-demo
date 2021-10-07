const mongo = require('mongoose');
const ProfileSchema = mongo.Schema;
const Profile = new ProfileSchema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
    },
    Data:{
        type:Date,
        default:Date.now
    }
})
module.exports = profile = mongo.model("profile",Profile);