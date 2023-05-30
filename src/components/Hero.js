import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero(props) {
  const navigate = useNavigate();

  // Search for the recipe entered by user, store results in local storage and navigate to Recipe.js :-
  const recipe=async(str)=>{
    let data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${props.apiKey}&query=${str}&number=10`);
    let parsedData = await data.json();
    parsedData = JSON.stringify(parsedData);
    localStorage.setItem('recipes', parsedData);
    navigate('/recipeContainer');
  };
  const handleRecipeForm=async(event)=>{
    event.preventDefault();
    let str = document.getElementById('searchValue').value;
    if(str){
      recipe(str);
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