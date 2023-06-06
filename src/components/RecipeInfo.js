import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function RecipeInfo(props) {
  // Fetch and populate the recipe instructions for the item seleted by the user :-
  const fetchInstructions=async()=>{
    let searchStr = localStorage.getItem('instructionsStr');
    let data = await fetch(`${searchStr}`);
    let instructions = await data.json();
    try{
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
    catch{
      console.log("Unable to mount the recipeInfo component");
    }
  }

  useEffect(()=>{
    // Set the id of the selected recipe :-
    props.setSelectedRecipeID(parseInt(localStorage.getItem('selectedRecipeID')));
    // Fetch recipe instructions :-
    fetchInstructions();
    // eslint-disable-next-line
  }, [])

  // Like button :-
  const [like, setLike] = useState(0);

  // Liking a recipe :-
  const likeRecipe=async(recipeid)=>{
    await fetch(`${props.server}/recipe/likerecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      },
      body: JSON.stringify({
        recipeID: recipeid
      })
    });
  }

  // Removing like from a recipe :-
  const dislikeRecipe=async(recipeid)=>{
    await fetch(`${props.server}/recipe/dislikerecipe/${recipeid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      }
    });
  }

  // Toggle like and dislike :-
  const likeDislike=()=>{
    const likeBtn = document.querySelector('.like-review');
    if(props.login){
      if(!like){
        likeBtn.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> You liked this';
        document.querySelector('.fa-heart').classList.add('animate-like');
        setLike(1);
        // Make a request for liking the recipe :-
        likeRecipe(props.selectedRecipeID);
      }
      else{
        likeBtn.innerHTML = "<i class='fa fa-heart' aria-hidden='true'></i> Like";
        document.querySelector('.fa-heart').classList.remove('animate-like');
        setLike(0);
        // Make a request for removing like from the recipe :-
        dislikeRecipe(props.selectedRecipeID);
      }
    }
    else{
      props.openModal();
    }
  }

  // Fetch whether the user has liked a recipe and then manipulate the like button accordingly :-
  const fetchLike=async()=>{
    let data = await fetch(`${props.server}/recipe/fetchlike`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      }
    });
    const likedRecipes = await data.json();
    if(data.status === 200){
      likedRecipes.forEach((element)=>{
        if(element.recipeID === props.selectedRecipeID){
          document.querySelector('.like-review').innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> You liked this';
          setLike(1);
        }
      });
    }
  };
  useEffect(()=>{
    if(props.login){
      fetchLike();
    }
    else{
      document.querySelector('.like-review').innerHTML = "<i class='fa fa-heart' aria-hidden='true'></i> Like";
      document.querySelector('.fa-heart').classList.remove('animate-like');
      setLike(0);
    }
    // eslint-disable-next-line
  }, [props.login]);

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
        <button class="btn-secondary like-review" onClick={likeDislike}>
          <i class='fa fa-heart' aria-hidden='true'></i> Like
        </button>
      </div>
    </div>
  )
}

export default RecipeInfo;