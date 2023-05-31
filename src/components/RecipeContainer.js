import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

function RecipeContainer(props) {
  const [numRecipe, setNumRecipe] = useState(0); // Will store index of recipes to be shown
  const [totalResults, setTotalResults] = useState(0);

  // Take out the recipes from local storage and populate on this page :-
  const [recipe, setRecipe] = useState([]); // Stroes all the recipes
  const [recipeToShow, setRecipeToShow] = useState([]); // Stores the recipes to show

  const fetchRecipe=async()=>{
    props.setProgress(10);
    let str = localStorage.getItem('str');
    let data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${props.apiKey}&query=${str}&number=100`);
    props.setProgress(40);
    let recipes = await data.json();
    props.setProgress(70);
    setRecipe(recipes.results);
    setTotalResults(recipes.number);
    // It takes time to update state variable. Hence, we cannot use recipe.slice in the next line.
    setRecipeToShow(recipes.results.slice(0, numRecipe+4));
    props.setProgress(100);
  };
  
  useEffect(()=>{
    fetchRecipe();
    console.log(recipeToShow)
    // eslint-disable-next-line
  }, []);
  
  // Fetching more recipes for infinite scroll :-
  const fetchMoreRecipes=()=>{
    setRecipeToShow(recipe.slice(0, numRecipe+8)); // Takin 4 more elements everytime
    setNumRecipe(numRecipe + 4);
  }

  return (
    <div id='recipesContainer'>
      <div className="divider"></div>
      <InfiniteScroll
        dataLength={recipeToShow.length}
        next={fetchMoreRecipes}
        hasMore={recipeToShow.length < totalResults}
        loader={<Spinner/>}
      >
      {recipeToShow.map((element)=>{
        return <Recipe key={element.id} imgSrc={element.image} title={element.title}/>
      })}
      </InfiniteScroll>
    </div>
  )
}

export default RecipeContainer;