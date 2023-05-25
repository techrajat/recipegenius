import React from 'react'
import '../App.css'
import Logo from '../images/Logo.png'
import Login from './Login';

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src={Logo} alt="logo" id='logo' /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navContent">
                <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Recipes
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/">Breakfast</a></li>
                    <li><a className="dropdown-item" href="/">Lunch</a></li>
                    <li><a className="dropdown-item" href="/">Dinner</a></li>
                </ul>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Cuisines
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/">Italian</a></li>
                    <li><a className="dropdown-item" href="/">Mexican</a></li>
                    <li><a className="dropdown-item" href="/">Chinese</a></li>
                    <li><a className="dropdown-item" href="/">Indian</a></li>
                    <li><a className="dropdown-item" href="/">Thai</a></li>
                    <li><a className="dropdown-item" href="/">Japanese</a></li>
                    <li><a className="dropdown-item" href="/">French</a></li>
                    <li><a className="dropdown-item" href="/">Spanish</a></li>
                    <li><a className="dropdown-item" href="/">American</a></li>
                    <li><a className="dropdown-item" href="/">More...</a></li>
                </ul>
                </li>
                <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Restaurants</a>
                </li>
                <li className="nav-item">
                <Login></Login>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2 search" type="search" placeholder="Search for recipe, nutrients, ingredients" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar