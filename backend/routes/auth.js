const express = require('express');
const router = express.Router();
const User = require('../models/User');

let warningMessage;
router.post('/register', async (req, res)=>{
    try{
        let phoneExists = await User.findOne({phone: req.body.phone});
        let emailExists = await User.findOne({email: req.body.email});

        if(phoneExists && emailExists){
            warningMessage = "** User already exists";
            res.redirect('http://localhost:3000/register');
            return;
        }
        if(phoneExists){
            warningMessage = "** Phone number already registered";
            res.redirect('http://localhost:3000/register');
            return;
        }
        if(emailExists){
            warningMessage = "** Email id already registered";
            res.redirect('http://localhost:3000/register');
            return;
        }

        let user = new User(req.body);
        user.save();
        res.redirect('http://localhost:3000/login');
    }
    catch{
        warningMessage = "** Internal server error";
        res.redirect('http://localhost:3000/register');
    }
});

router.get('/regWarn', (req, res)=>{
    res.send(warningMessage);
});

module.exports = router;