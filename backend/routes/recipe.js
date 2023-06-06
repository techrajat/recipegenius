const express = require('express');
const router = express.Router();
const Likedrecipe = require('../models/Likedrecipe');
const fetchuser = require('../middleware/fetchuser');

// Endpoint for liking a recipe :-
router.post('/likerecipe', fetchuser, async (req, res)=>{
   try{
    const recipeid = parseInt(req.body.recipeID);
    if(recipeid){
        await Likedrecipe.create({
            user: req.user.id,
            recipeID: recipeid
        });
        res.status(200).json({success: "Recipe liked successfully"});
    }
    else{
        res.status(400).json({error: "Invalid recipe id"});
    }
   }
   catch{
    res.status(500).json({error: "Invalid recipe id"});
   } 
});

// Endpoint for fetching whether the user has liked a recipe or not :-
router.get('/fetchlike', fetchuser, async (req, res)=>{
    try{
        const user = await Likedrecipe.find({user: req.user.id});
        if(!user){
            return res.status(400).json({message: "No liked recipes"});
        }
        let recipeIDs = user.map((element)=>{
            return ({recipeID: element.recipeID})
        });
        res.status(200).json(recipeIDs);
    }   
    catch{
        return res.status(500).json({message: "No liked recipes"});
    }
});

// Endpoint for removing like from a recipe :-
// :id represents that id can vary in the endpoint. Whenever using the fetch api in the frontend, we
// can make the request as http://127.0.0.1:5000/api/recipe/dislikeRecipe/1234, where 1234 is the id
// of the recipe from which we want to remove the like.
router.delete('/dislikerecipe/:id', fetchuser, async (req, res)=>{
    try{
        let recipeid = parseInt(req.params.id);
        let user = await Likedrecipe.findOne({user: req.user.id, recipeID: recipeid});
        if(!user){
            return res.status(400).json({error: "Invalid recipe id"});
        }
        await Likedrecipe.findOneAndDelete({user: req.user.id, recipeID: recipeid});
        res.status(200).json({success: "Recipe removed from likes"});
    }
    catch{
        return res.status(500).json({error: "Invalid recipe id"});
    }
});

module.exports = router;