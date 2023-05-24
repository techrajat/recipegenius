import React from 'react'

function Hero() {
  return (
    <div className="hero">
      <form action="/recipeSearch" method='post' className='recipeForm'>
        <h1>Find a Recipe</h1>
        <input type="text" placeholder='Search for recipes, nutrients, ingredients' />  
        <button type="button" class="btn btn-success">Search</button>
      </form>
    </div>
  )
}

export default Hero