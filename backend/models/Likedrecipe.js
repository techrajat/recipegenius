const mongoose = require('mongoose');
const {Schema} = mongoose;

// Since every liked recipe is linked to a user, hence we have a field 'user' in the schema 'Recipe'
// which will store the id of the user liking the recipe. Also, it should act as a foreign key to the
// field '_id' of the schema 'User'. It is not necessary to make a foreign key but it will make sure
// that only a registered user can like a recipe.
const RecipeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Datatype for the _id field on MongoDB
        ref: 'User', // Reference to the User model
        required: true
    },
    recipeID: {
        type: Number,
        required: true,
    }
});

const LikedRecipe = mongoose.model('Recipe', RecipeSchema);
module.exports = LikedRecipe;