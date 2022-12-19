const User = require('../model/User.js');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/createuser',async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        let user = await User.findOne({email:email});
        let encryptPassword = await bcrypt.hash(password,10);
        if(!user){
            let user = await User.create({name:name,email:email,password:encryptPassword});
            res.status(201).json({success:true,data:user.id,statusCode:201});
        }
        else{
            res.status(401).json({success:false,msg:"A user with this email already exists"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:'Internal server error'});
        
    }
})

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email:email});
        if(!user){
            res.status(401).json({success:false,msg:"Please login using correct credentials"});
        }
        else{
            let comparePassword = await bcrypt.compare(password,user.password);
            if(comparePassword){
                res.status(200).json({success:true,data:user.id,statusCode:200});
            }else{
                res.status(401).json({success:false,msg:"Please enter correct credentials"});
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:'Internal server error'});
        
    }
})

module.exports = router;