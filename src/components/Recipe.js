import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    // const navigate = useNavigate();

    // useEffect(()=>{
    //     let similarRecipe = document.querySelectorAll('.similar');
    //     similarRecipe.forEach((element)=>{
    //         element.addEventListener('click', ()=>{
    //             let recipeid = element.parentElement.parentElement.parentElement.id;
    //             console.log(recipeid)
    //             recipeid = parseInt(recipeid.match(/\d+(\.\d+)?/g));
    //             // recipeid = recipeid.toString();
    //             localStorage.setItem('searchStr', `https://api.spoonacular.com/recipes/${recipeid}/similar?apiKey=${props.apiKey}&number=100`);
    //             navigate('/recipeContainer');
    //         });
    //     })
    // // eslint-disable-next-line
    // }, [])


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