import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero(props) {
  const navigate = useNavigate();

  // Save the recipe string entered by user in local storage and navigate to RecipeContainer.js :-
  const handleRecipeForm=async(event)=>{
    event.preventDefault();
    let str = document.getElementById('searchValue').value;
    if(str){
      localStorage.setItem('str', str);
      navigate('/recipeContainer');
    }
  };

  return (
    <div>
      <form className="hero" onSubmit={handleRecipeForm}>
        <h1>Find a Recipe</h1>
        <input type="text" id='searchValue' placeholder='Search for recipes, nutrients, ingredients'/>  
        <button type="submit" class="btn btn-success">Search</button>
      </form>
    </div>
  )
}

export default Hero