import React from 'react';
import { useEffect } from 'react';

function Recipe(props) {

    // Set style for the title when hovering on the recipe :-
    useEffect(()=>{
        document.querySelectorAll('.recipes').forEach((element)=>{
            element.addEventListener('mouseover', ()=>{
                let id = element.id;
                document.querySelector(`#${id} .title`).style.color = 'green';
                document.querySelector(`#${id} .title`).style.textDecorationLine = 'underline';
            });
            element.addEventListener('mouseout', ()=>{
                let id = element.id;
                document.querySelector(`#${id} .title`).style.color = 'black';
                document.querySelector(`#${id} .title`).style.textDecoration = 'none';
            });
        });
    }, []);

    // Open the instructions for a recipe when clicked :-
    useEffect(()=>{
        let recipe = document.querySelectorAll('.recipes');
        recipe.forEach((element)=>{
            element.addEventListener('click', ()=>{
                let recipeid = element.id;
                recipeid = parseInt(recipeid.match(/\d+(\.\d+)?/g));
                props.setSelectedRecipeID(recipeid);
                localStorage.setItem('instructionsStr', `https://api.spoonacular.com/recipes/${recipeid}/information?apiKey=${props.apiKey}`);
                props.setRecipeClicked(1);
            });
        })
    // eslint-disable-next-line
    }, [])


  return (
    <>
      <div className="recipes" id={`recipe${props.recipeID}`}>
        <div className="divider"></div>
        <div className="img"><img src={props.imgSrc} alt="recipeImage" /></div>
        <div className="title">{props.title}</div>
      </div>
    </>
  )
}

export default Recipe;