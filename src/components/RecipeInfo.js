import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function RecipeInfo() {
  // Fetch and populate the recipe instructions for the item seleted by the user :-
  const fetchInstructions=async()=>{
    let searchStr = localStorage.getItem('instructionsStr');
    let data = await fetch(`${searchStr}`);
    let instructions = await data.json();
    // Populate the title :-
    document.getElementById('recipeName').innerHTML = `${instructions.title}`;
    // Populate the image
    document.querySelector('.recipeImage').innerHTML = `<img src="${instructions.image}" alt="recipeImage" />`;
    // Populate the ingredients :-
    document.getElementById('ingredientsList').innerHTML = instructions.extendedIngredients.map((element)=>{
      return `<li>${element.original}</li>`;
    }).join('');
    // Populate the instructions :-
    document.getElementById('instructionList').innerHTML = instructions.analyzedInstructions[0].steps.map((element)=>{
      return `<li>${element.step}</li>`;
    }).join('');
  }

  useEffect(()=>{
    fetchInstructions();
  }, [])

  // Like button :-
  const [like, setLike] = useState(0);
  // Javscript for like button :-
  useEffect(()=>{
      let likeBtn = document.querySelector('.like-review');
      likeBtn.addEventListener('click', ()=>{
        if(!like){
          likeBtn.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> You liked this';
          document.querySelector('.fa-heart').classList.add('animate-like');
          setLike(1);
        }
        else{
          likeBtn.innerHTML = "<i class='fa fa-heart' aria-hidden='true'></i> Like";
          document.querySelector('.fa-heart').classList.remove('animate-like');
          setLike(0);
        }
    });
  }, [like]);

  return (
    <div id='recipeInfo'>
      <div id="img_ingredients">
        <div id="image_head">
            <h3 id='recipeName'>Recipe title</h3>
            <div className="recipeImage"></div>
        </div>
        <div className="ingredients">
            <h4>Ingredients</h4>
            <ul id='ingredientsList'></ul>
        </div>
      </div>
      <div id="instructions">
        <h4>Instructions</h4>
        <ol id="instructionList">
        </ol>
      </div>
      <div class="like-content">
        <span>
          Did you like this recipe?
        </span>
        <button class="btn-secondary like-review">
          <i class='fa fa-heart' aria-hidden='true'></i> Like
        </button>
      </div>
    </div>
  )
}

export default RecipeInfo;