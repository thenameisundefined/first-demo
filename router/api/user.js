const express = require('express');
const router = express.Router();
const users = require('../../moudle/userMgs');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/mongooseUrl');
const passport = require('passport');
router.post('/register',(req,res) => {
    users.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            return res.status(400).json('邮箱已经存在');
        } else {
            const icon = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'});
            const User = new users({
                name:req.body.name,
                password:req.body.password,
                email:req.body.email,
                icon,
                identifier:req.body.identifier
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(User.password, salt, (err, hash) => {
                    if(err) throw err;
                    User.password = hash;
                    User.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    })
})
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    users.findOne({email})
    .then((user)=>{
        if(user){
            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(isMatch) {
                    const rule = {id:user.id,name:user.name,icon:user.icon,identifier:user.identifier,email:user.email}
                   jwt.sign(rule,keys.secret,{expiresIn:3600},(error,token)=>{
                       if(error) throw error;
                       res.json({
                           mes:'success',
                           token:'Bearer '+token
                       })
                   });
                } else {
                    return res.status(400).json('密码错误')
                }
            })
        } else {
            return res.status(404).json('用户不存在')
        }
    })
})
router.get('/current',passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({msg:{
        name:req.user.name,
        email:req.user.email,
        id:req.user._id,
        identifier:req.user.identifier
    }});
})
module.exports = router;