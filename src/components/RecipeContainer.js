import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Recipe() {
    // Take out the recipes from local storage and populate on this page :-
    useEffect(()=>{
        let recipes = localStorage.getItem('recipes');
        recipes = JSON.parse(recipes);
        console.log(recipes.results[0].title);
    }, []);

  return (
    <div id='recipesContainer'>
      <div class="divider"></div>
      <div id="recipes">
        <div className="img"><img src="https://spoonacular.com/recipeImages/638263-312x231.jpg" alt="recipeImage" /></div>
        <div className="title"><pre>Chicken Pita Fajita  |  <Link id='similar'>Get similar recipes</Link> <i class="fa-sharp fa-solid fa-arrow-right arrow"></i></pre></div>
      </div>
      <div class="divider"></div>
      <div id="recipes">
        <div className="img"><img src="https://spoonacular.com/recipeImages/638263-312x231.jpg" alt="recipeImage" /></div>
        <div className="title"><pre>Chicken Pita Fajita  |  <Link>Get similar recipes</Link> <i class="fa-sharp fa-solid fa-arrow-right"></i></pre></div>
      </div>
    </div>
  )
}

export default Recipe