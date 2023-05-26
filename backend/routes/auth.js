const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res)=>{
    try{
        let phoneExists = await User.findOne({phone: req.body.phone});
        let emailExists = await User.findOne({email: req.body.email});

        if(phoneExists && emailExists){
            res.json({error: "Sorry, a user with this phone number and email id already exists"});
            return;
        }
        if(phoneExists){
            res.json({error: "Sorry, a user with this phone number already exists"});
            return;
        }
        if(emailExists){
            res.json({error: "Sorry, a user with this email id already exists"});
            return;
        }

        let user = new User(req.body);
        user.save();
    }
    catch{
        res.send("Internal server error");
    }
});

module.exports = router;