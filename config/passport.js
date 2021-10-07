const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const mongoose = require('mongoose');
const User = mongoose.model('user');
const secret = require('../config/mongooseUrl').secret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;
module.exports = passport =>{
    passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
        User.findById(jwt_payload.id).then(
            (user) =>{
                if(user){
                    return done(null,user)
                }
                return done(null,false)
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    }));
}