import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

function LikedRecipes(props) {
    const navigate = useNavigate();

    const [recipeToShow, setRecipeToShow] = useState([]);
    const [likedRecipeIDs, setLikedRecipesIDs] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    // Fetch the IDs of liked recipes and then fetch the first three recipes :-
    const fetchRecipes=async()=>{
        const data = await fetch(`${props.server}/recipe/fetchlike`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
          }
        });
        if(data.status === 200){
          const dataJson = await data.json();
          setLikedRecipesIDs(dataJson);
          setTotalResults(dataJson.length);
          let likedRecipes = [];
          dataJson.slice(0, 3).forEach(async(element)=>{
            let recipe = await fetch(`https://api.spoonacular.com/recipes/${element.recipeID}/information?apiKey=${props.apiKey}`);
            recipe = await recipe.json();
            likedRecipes = likedRecipes.concat({id: recipe.id, image: recipe.image, title: recipe.title});
            setRecipeToShow(likedRecipes);
          });
        }
    }
    useEffect(()=>{
      fetchRecipes();
      // eslint-disable-next-line
    }, []);

    // Fetch more recipes one by one :-
    const fetchMoreRecipes=async()=>{
      let recipe = await fetch(`https://api.spoonacular.com/recipes/${likedRecipeIDs[recipeToShow.length].recipeID}/information?apiKey=${props.apiKey}`);
      recipe = await recipe.json();
      setRecipeToShow(recipeToShow.concat({id: recipe.id, image: recipe.image, title: recipe.title}));
    }

    // To determine whether the user has chosen a recipe (1 if yes) and then open RecipeInfo.js:-
    const [recipeClicked, setRecipeClicked] = useState(0);
    useEffect(()=>{
        if(recipeClicked){
          navigate('/recipeInfo');
        }
    }, [recipeClicked, navigate]);

  return (
    <>
    <div id="likedRecipeHead">
      <h3>Liked recipes</h3>
    </div>
    <div id='likedRecipesContainer'>
      <InfiniteScroll
        dataLength={recipeToShow.length}
        next={fetchMoreRecipes}
        hasMore={recipeToShow.length < totalResults}
        loader={<Spinner/>}
      >
      {recipeToShow.map((element)=>{
        return <Recipe key={element.id} imgSrc={element.image} title={element.title} recipeID={element.id} apiKey={props.apiKey} setRecipeClicked={setRecipeClicked} />
      })}
      </InfiniteScroll>
    </div>
    </>
  )
}

export default LikedRecipes;