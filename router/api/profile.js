const express = require('express');
const router = express.Router();
const Profile = require('../../moudle/profile');
const passport = require('passport');
router.post('/add',passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profile = {};
    for (let i in req.body){
        profile[i] = req.body[i];
    }
    new Profile(profile).save().then(profile=>{
        res.json(profile);
    })
});
router.get('/get',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
    .then(profile=>{
        if(!profile){
           return res.status(400).json('没有信息');
        }
        res.json(profile);
    })
    .catch(err=>{
        console.log(err);
    })
});
router.get('/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
    .then(profile=>{
        if(!profile){
           return res.status(400).json('没有信息');
        }
        res.json(profile);
    })
    .catch(err=>{
        res.status(200).json(err);
    })
});
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profile = {};
    for(let i in req.body) {
        profile[i]=req.body[i];
    }
    Profile.findOneAndUpdate(
      {_id:req.params.id},
      {$set:profile},
      {new:true}
    )
    .then(profile=>{
        if(!profile){
           return res.status(404).json('没有信息');
        }
        res.json(profile);
    })
    .catch(err=>{
        res.status(404).json(err);
    })
});
router.delete('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id})
    .then(profile=>{
        res.json(profile);
    })
    .catch(err=>{res.status(404).json('删除失败')})
});
module.exports = router;