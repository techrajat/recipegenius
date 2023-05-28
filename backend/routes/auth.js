const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res)=>{
    try{
        let user = await User.findOne({phone: req.body.phone, email: req.body.email})
        if(user){
            return res.status(400).json({errors: "** User already registered"});
        }

        let phoneExists = await User.findOne({phone: req.body.phone});
        if(phoneExists){
            return res.status(400).json({ errors: "** Phone number already registered" });
        }

        let emailExists = await User.findOne({email: req.body.email});
        if(emailExists){
            return res.status(400).json({ errors: "** Email id already registered" });
        }
        
        user = await User.create(req.body); // Create a new user
        res.json(user);
    }
    catch{
        return res.status(500).json({ errors: "** Internal server error" });
    }
});

module.exports = router;