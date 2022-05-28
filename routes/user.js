const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Preference = require('../models/preference');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const {username, password} = req.body.auth;
    const {genres,country,birthyear} = req.body.preference;
    try{
        let user_exist = await User.findOne({username:username});
        if(user_exist){
            return res.status(409).json({
                msg:'User already exist'
            });
        }
        
        let user = new User();
        user.username = username;
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        let preference = new Preference();
        for(let i of genres){
            preference.genre[i].value= 1;
        }
        preference.country = country;
        preference.birthyear = birthyear;
        preference.user = user.id;
        user.preference = preference.id
        await preference.save();
        await user.save();

        const payload ={
            preference:{
                id:preference.id
            }
        }
        jwt.sign(payload, process.env.jwtUserSecret,{
            expiresIn:30000
        }, (err, token)=>{
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true })
            res.status(201).json({
                msg:'Registered successfully',
                token:token
            });
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:`Server Error`
        })
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try{
        let user = await User.findOne({
            username:username
        });
        if(!user){
            return res.status(404).json({
                msg:'User does not exist, Resister to continue!'
            });
        }   
        const isMatch = await bcryptjs.compare(password, user.password);    
        if(!isMatch){
            return res.status(401).json({
                msg:'Inavalid Credentials'  
            })
        }   

        const payload = {
            preference:{
                id:user.preference
            }
        }   
        jwt.sign(payload, process.env.jwtUserSecret,{
            expiresIn:300000
        },(err, token)=>{
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true })
            res.status(200).json({
                token:token
            });
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:`Server Error`
        })
    }
});

module.exports = router;