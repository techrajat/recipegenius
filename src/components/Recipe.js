import React from 'react'
import { Link } from 'react-router-dom'

function Recipe(props) {
  return (
    <>
      <div className="recipes">
      <div className="divider"></div>
        <div className="img"><img src={props.imgSrc} alt="recipeImage" /></div>
        <div className="title"><pre>{props.title}  |  <Link className='similar'>Get similar recipes</Link> <i class="fa-sharp fa-solid fa-arrow-right arrow"></i></pre></div>
      </div>
    </>
  )
}

export default Recipe